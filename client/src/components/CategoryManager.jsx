import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Archive,
  Edit3,
  Loader,
  PlusCircle,
  Upload,
  CheckCircleIcon,
} from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

// Utility function to generate URL-friendly href
const generateHref = (name) => {
  return `/category/${name.toLowerCase().replace(/\s+/g, "-")}`;
};

// CreateCategoryForm Component
const CreateCategoryForm = ({ category, onCancel }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    href: "",
    image: "",
  });

  const { createCategory, updateCategory, loading } = useProductStore();

  useEffect(() => {
    if (category) {
      setNewCategory({
        name: category.name,
        href: category.href,
        image: category.imageUrl,
      });
    }
  }, [category]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const href = generateHref(name);
    setNewCategory({ ...newCategory, name, href });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        await updateCategory(category._id, newCategory);
        toast.success("Category updated successfully");
      } else {
        await createCategory(newCategory);
        toast.success("Category created successfully");
        setNewCategory({
          name: "",
          href: "",
          image: "",
        });
      }
      onCancel();
    } catch (error) {
      toast.error("Error processing the request");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCategory({ ...newCategory, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-lg p-6 mb-8 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl text-center font-semibold mb-6 text-emerald-600">
        {category ? "Update Category" : "Create New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCategory.name}
            onChange={handleNameChange}
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="href"
            className="block text-sm font-medium text-gray-300"
          >
            URL (Auto-generated)
          </label>
          <input
            type="text"
            id="href"
            name="href"
            value={newCategory.href}
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-400"
            readOnly
          />
        </div>

        <div className="mt-1 flex items-center space-x-3">
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
          {newCategory.image && (
            <span className="text-sm text-emerald-400">
              <CheckCircleIcon className="h-5 w-5 inline-block mr-1" />
              Image Uploaded
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
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
              <PlusCircle className="mr-2 h-5 w-5" />
              {category ? "Update Category" : "Create Category"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 w-full text-center text-gray-400"
        >
          Cancel
        </button>
      </form>
    </motion.div>
  );
};

// CategoryManager Component
const CategoryManager = () => {
  const { categories, toggleCategoryStatus, loading } = useProductStore();
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsCreating(true);
  };

  const handleCreateNew = () => {
    setEditingCategory(null);
    setIsCreating(true);
  };

  const handleDeleteCategory = (categoryId) => {
    toggleCategoryStatus(categoryId);
  };

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-lg max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          {isCreating
            ? editingCategory
              ? "Edit Category"
              : "Create New Category"
            : "Categories"}
        </h2>
        {!isCreating && (
          <button
            onClick={handleCreateNew}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md flex items-center transition-all"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Category
          </button>
        )}
      </div>

      {isCreating ? (
        <CreateCategoryForm
          category={editingCategory}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <CategoryList
          categories={categories}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          loading={loading}
        />
      )}
    </motion.div>
  );
};

// CategoryList Component
const CategoryList = ({
  categories,
  onEditCategory,
  onDeleteCategory,
  loading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-950">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {categories?.map((category) => (
            <motion.tr
              key={category._id}
              className={`hover:bg-gray-800 transition-all ${
                !category.isActive ? "opacity-50" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                <img
                  src={category.imageUrl || "/default-category.png"}
                  alt={category.name}
                  className="h-10 w-10 object-cover rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {category.isActive ? "Active" : "Inactive"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEditCategory(category)}
                  className="text-emerald-600 hover:text-emerald-700 transition-all"
                >
                  <Edit3 className="inline-block h-5 w-5 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDeleteCategory(category._id)}
                  className="text-red-600 hover:text-red-700 transition-all ml-4"
                >
                  <Archive className="inline-block h-5 w-5 mr-1" />
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;
