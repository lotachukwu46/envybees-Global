import {
  BarChart,
  PlusCircle,
  ShoppingBasket,
  FolderPlus,
  FileText,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore";
import CategoryManager from "../components/CategoryManager";
import OrdersTab from "../components/OrderTab";

const tabs = [
  {
    id: "create",
    label: "Create Product",
    icon: PlusCircle,
  },
  {
    id: "products",
    label: "Products",
    icon: ShoppingBasket,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart,
  },
  {
    id: "categories",
    label: "Categories",
    icon: FolderPlus,
  },
  {
    id: "orders",
    label: "Orders",
    icon: FileText,
  },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);
  const { fetchAllProducts, fetchAllCategories } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, [fetchAllProducts, fetchAllCategories]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab("create");
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-200">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-500 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingProduct(null);
              }}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conditional Rendering for Tabs */}
        <div className="relative z-10 bg-gray-800 rounded-lg p-6 shadow-lg">
          {activeTab === "create" && (
            <CreateProductForm product={editingProduct} />
          )}
          {activeTab === "products" && (
            <ProductsList onEditProduct={handleEditProduct} />
          )}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "orders" && <OrdersTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
