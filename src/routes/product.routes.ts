import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect, adminOnly } from "../middlewares/auth.middleware";

const productrouter = express.Router();

productrouter.get("/", getProducts);
productrouter.get("/:id", getProduct);

// Protected routes for admin
productrouter.post("/", protect, adminOnly, createProduct);
productrouter.put("/:id", protect, adminOnly, updateProduct);
productrouter.delete("/:id", protect, adminOnly, deleteProduct);

export default productrouter;
