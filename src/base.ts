import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import routes from "./routes/index.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
 app.use("/api", routes);


export default app;
