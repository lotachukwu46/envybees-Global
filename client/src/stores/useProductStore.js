import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  featuredProducts: [],
  categories: [], // Add categories to store
  loading: false,
  // Set products and categories
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),

  // Fetch products by category
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/product/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Create a product
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/product", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Update a product
  updateProduct: async (productId, productData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/product/${productId}`, productData); // Adjust the route here
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId ? response.data : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Fetch all products
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/product");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Delete a product
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/product/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Toggle featured product
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/product/${productId}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Product featured status updated");
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/product/featured");
      set({ featuredProducts: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch featured products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },

  // CATEGORY ACTIONS

  // Fetch all categories
  fetchAllCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/category");
      set({ categories: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Create a category
  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/category", categoryData);
      set((prevState) => ({
        categories: [...prevState.categories, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Update a category
  updateCategory: async (categoryId, categoryData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/category/${categoryId}`, categoryData);
      set((prevState) => ({
        categories: prevState.categories.map((category) =>
          category._id === categoryId ? response.data : category
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Delete a category
  // Toggle category status (Soft Delete/Activate)
  toggleCategoryStatus: async (categoryId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/category/${categoryId}`);
      set((prevState) => ({
        categories: prevState.categories.map((category) =>
          category._id === categoryId
            ? { ...category, isActive: response.data.category.isActive }
            : category
        ),
        loading: false,
      }));
      const successMessage = response.data.message;
      toast.success(successMessage);
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },

  // Fetch only active categories
  fetchActiveCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/active");
      set({ categories: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred";
      toast.error(errorMsg);
    }
  },
}));
