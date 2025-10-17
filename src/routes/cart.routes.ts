import express from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/remove/:productId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

export default router;
