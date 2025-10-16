import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect, adminOnly } from "../middlewares/auth.middleware";
import parser from "../config/multer"; // ← import multer/cloudinary

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected routes for admin
// parser.array('images') expects the form field name to be 'images'
router.post("/", protect, adminOnly, parser.array("images", 5), createProduct);
router.put("/:id", protect, adminOnly, parser.array("images", 5), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
