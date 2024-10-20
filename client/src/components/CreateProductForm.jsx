import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, CheckCircle, Edit } from "lucide-react"; // Edit icon for updating
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const CreateProductForm = ({ product }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, updateProduct, loading, categories } =
    useProductStore();

  useEffect(() => {
    if (product) {
      setNewProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        // Update existing product
        await updateProduct(product._id, newProduct);
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await createProduct(newProduct);
        toast.success("Product created successfully");
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
        });
      }
    } catch (error) {
      toast.error("Error processing the request");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl text-center font-semibold mb-6 text-emerald-600">
        {product ? "Update Product" : "Create New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-4 px-3 text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step={0.01}
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category._id || category}
                value={category.name || category}
              >
                {category.name || category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 flex items-center mb-2">
          <input
            type="file"
            id="image"
            className="sr-only"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-800 py-2 px-3 border border-gray-700 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-emerald-400">
              <CheckCircle className="h-5 w-5 inline-block mr-2" />
              Image Uploaded
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading
            </>
          ) : (
            <>
              {product ? (
                <Edit className="mr-2 h-5 w-5" /> // Edit icon for update
              ) : (
                <PlusCircle className="mr-2 h-5 w-5" /> // PlusCircle for create
              )}
              {product ? "Update Product" : "Create Product"}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
