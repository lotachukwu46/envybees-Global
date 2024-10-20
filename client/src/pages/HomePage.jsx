import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Hardcoded fallback categories in case of an error
const fallbackCategories = [
  { href: "/laptops", name: "Laptops", imageUrl: "/computer.jpeg" },
  { href: "/phones", name: "Phones", imageUrl: "/phone.jpeg" },
  { href: "/watches", name: "Watches", imageUrl: "/watches.jpeg" },
  { href: "/computers", name: "Computers", imageUrl: "/DesktopComputer.webp" },
  { href: "/ssd", name: "SSD", imageUrl: "/ssd.webp" },
  { href: "/ram", name: "System RAMs", imageUrl: "/ram.webp" },
];

const HomePage = () => {
  const {
    fetchFeaturedProducts,
    featuredProducts,
    isLoading,
    categories,
    fetchAllCategories,
  } = useProductStore();
  const [activeCategories, setActiveCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchAllCategories();
        const active = categories.filter((category) => category.isActive);
        setActiveCategories(active);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setActiveCategories(fallbackCategories);
      } finally {
        setLoadingCategories(false); // Loading is complete
      }
    };

    fetchFeaturedProducts(); // Fetch featured products
    loadCategories(); // Fetch categories
  }, [fetchFeaturedProducts, fetchAllCategories, categories]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-5xl sm:text-6xl font-bold text-emerald-500"
        >
          Explore Our Categories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-xl text-gray-300 mb-12"
        >
          Discover the latest technological trends
        </motion.p>

        {/* Categories Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loadingCategories
            ? // Skeleton loader for categories
              Array(6)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : // Render active categories
              activeCategories.map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <CategoryItem category={category} />
                </motion.div>
              ))}
        </div>

        {/* Featured Products Section */}
        {!isLoading && featuredProducts.length > 0 ? (
          <FeaturedProducts featuredProducts={featuredProducts} />
        ) : (
          // Skeleton loader for featured products
          <div className="mt-12">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

const SkeletonCard = () => (
  <motion.div
    className="bg-gray-800 rounded-lg p-6 h-80 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Skeleton
      height={50}
      width="80%"
      baseColor="#1F2937"
      highlightColor="#374151"
    />
  </motion.div>
);
