import express from "express";
import { register, login } from "../controllers/auth.controller";

const Userroutes = express.Router();

Userroutes.post("/register", register);
Userroutes.post("/login", login);

export default Userroutes;
