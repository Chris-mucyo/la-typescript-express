import express from "express";
import { createOrder, confirmpayment } from "../controllers/order.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, createOrder);
router.post("/confirm", protect, confirmpayment);

export default router;
