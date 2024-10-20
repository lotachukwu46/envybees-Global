import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  href: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
