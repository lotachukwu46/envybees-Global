import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    handleError(res, "getAllProducts", error);
  }
};

// Get featured products from cache or database
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");

    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts.length) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    handleError(res, "getFeaturedProducts", error);
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url || "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    handleError(res, "createProduct", error);
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await deleteImageFromCloudinary(product.image);
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    handleError(res, "deleteProduct", error);
  }
};

// Get recommended products
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    handleError(res, "getRecommendedProducts", error);
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    handleError(res, "getProductsByCategory", error);
  }
};

// Toggle featured status of a product
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    handleError(res, "toggleFeaturedProduct", error);
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image upload
    if (image) {
      await deleteImageFromCloudinary(product.image);
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      product.image = cloudinaryResponse.secure_url;
    }

    // Update product fields
    Object.assign(product, { name, description, price, category });

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    handleError(res, "updateProduct", error);
  }
};

// Handle errors uniformly
const handleError = (res, functionName, error) => {
  console.log(`Error in ${functionName} controller:`, error.message);
  res.status(500).json({ message: "Server error", error: error.message });
};

// Delete image from Cloudinary
const deleteImageFromCloudinary = async (imageUrl) => {
  if (imageUrl) {
    const publicId = imageUrl.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(`products/${publicId}`);
      console.log("Deleted image from Cloudinary");
    } catch (error) {
      console.log("Error deleting image from Cloudinary:", error);
    }
  }
};

// Update featured products cache
async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in update cache function:", error.message);
  }
}
