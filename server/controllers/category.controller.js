import Category from "../models/category.model.js";
import cloudinary from "../lib/cloudinary.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Upload image to Cloudinary
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "categories",
      });
    }

    // Create new category
    const category = await Category.create({
      name,
      href: name.toLowerCase(),
      imageUrl: cloudinaryResponse?.secure_url || "",
    });

    res.status(201).json(category);
  } catch (error) {
    console.log("Error in createCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error in getAllCategories controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const categoryId = req.params.id;

    // Find the existing category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Upload new image if provided
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "categories",
      });
      category.imageUrl = cloudinaryResponse.secure_url;
    }

    // Update the name and href
    category.name = name;
    category.href = name.toLowerCase();

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.log("Error in updateCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Category
// Toggle Category Status (Soft Delete/Activate)
export const toggleCategoryStatus = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Toggle the isActive state
    category.isActive = !category.isActive;
    await category.save();

    const statusMessage = category.isActive
      ? "Category reactivated successfully"
      : "Category soft-deleted successfully";

    res.status(200).json({ message: statusMessage, category });
  } catch (error) {
    console.log("Error in toggleCategoryStatus controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all active categories
export const getAllActiveCategories = async (req, res) => {
  try {
    const activeCategories = await Category.find({ isActive: true });
    if (activeCategories.length === 0) {
      return res.status(404).json({ message: "No active categories found" });
    }
    res.status(200).json(activeCategories);
  } catch (error) {
    console.log("Error in getAllActiveCategories controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
