import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
// import authRoutes from "./routes/auth.routes";
// import productRoutes from "./routes/product.routes";
// import orderRoutes from "./routes/order.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

export default app;
