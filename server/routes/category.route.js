import express from "express";
import {
  createCategory,
  getAllCategories,
  getAllActiveCategories,
  updateCategory,
  toggleCategoryStatus,
} from "../controllers/category.controller.js";

const router = express.Router();

// Create a new category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

router.get("/active", getAllActiveCategories);

// Update a category
router.put("/:id", updateCategory);

// Delete a category
router.patch("/:id", toggleCategoryStatus);

export default router;
