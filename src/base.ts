import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import routes from "./routes/index.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
 app.use("/api/auth", routes);


export default app;
