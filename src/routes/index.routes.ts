import express from "express";
import Userroutes from "./user.routes";

const routes = express.Router();

routes.use("/users", Userroutes);

export default routes;