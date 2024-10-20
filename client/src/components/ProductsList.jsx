import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star, Loader, Edit3 } from "lucide-react"; // Added Edit3 icon for the edit button
import { useProductStore } from "../stores/useProductStore";

const ProductsList = ({ onEditProduct }) => {
  const { toggleFeaturedProduct, deleteProduct, products } = useProductStore();
  const [loadingId, setLoadingId] = useState(null); // Local loading state for each action

  const handleToggleFeatured = async (id) => {
    setLoadingId(id); // Set loading state for the specific product
    await toggleFeaturedProduct(id);
    setLoadingId(null); // Reset loading state after action is completed
  };

  const handleDeleteProduct = async (id) => {
    setLoadingId(id); // Set loading state for the specific product
    await deleteProduct(id);
    setLoadingId(null); // Reset loading state after action is completed
  };

  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Wrap the table inside a responsive div */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-950">
            <tr>
              <th
                scope="col"
                className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-800 transition-all"
              >
                <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 md:px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-2 md:px-6 py-4 text-sm text-gray-300">
                  {product.category}
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleFeatured(product._id)}
                    disabled={loadingId === product._id} // Disable button while loading for this product
                    className={`p-1 rounded-full ${
                      product.isFeatured ? "bg-yellow-400" : "bg-gray-900"
                    } hover:bg-yellow-500 transition-all duration-200`}
                  >
                    {loadingId === product._id ? (
                      <Loader className="animate-spin text-white h-5 w-5" />
                    ) : (
                      <Star
                        className={`h-5 w-5 ${
                          product.isFeatured ? "text-white" : "text-gray-300"
                        }`}
                      />
                    )}
                  </button>
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 md:space-x-4">
                  {/* Edit button */}
                  <button
                    onClick={() => onEditProduct(product)}
                    disabled={loadingId === product._id} // Disable button while loading for this product
                    className={`p-2 rounded-full transition-all ${
                      loadingId === product._id
                        ? "bg-gray-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loadingId === product._id ? (
                      <Loader className="animate-spin text-white h-5 w-5" />
                    ) : (
                      <Edit3 className="h-5 w-5 text-white" />
                    )}
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={loadingId === product._id} // Disable button while loading for this product
                    className={`p-2 rounded-full transition-all ${
                      loadingId === product._id
                        ? "bg-gray-500"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {loadingId === product._id ? (
                      <Loader className="animate-spin text-white h-5 w-5" />
                    ) : (
                      <Trash className="h-5 w-5 text-white" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsList;
