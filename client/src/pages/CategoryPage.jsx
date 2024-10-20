import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProductCard = () => (
  <motion.div
    className="bg-gray-800 rounded-lg p-4 w-full shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Skeleton
      height={150}
      width="100%"
      baseColor="#1F2937"
      highlightColor="#374151"
    />
    <Skeleton
      height={20}
      width="80%"
      baseColor="#1F2937"
      highlightColor="#374151"
      className="mt-2"
    />
  </motion.div>
);

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProductsByCategory(category);
      setLoading(false);
    };

    loadProducts();
  }, [fetchProductsByCategory, category]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:grid-cols-2 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading ? (
            // Display loading skeletons if loading
            Array(6)
              .fill(0)
              .map((_, index) => <SkeletonProductCard key={index} />)
          ) : (
            <>
              {products?.length === 0 && (
                <>
                  <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                    No products found
                  </h2>
                  <p className="text-xl font-semibold text-gray-300 text-center col-span-full">
                    Out of stock
                  </p>
                </>
              )}
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
