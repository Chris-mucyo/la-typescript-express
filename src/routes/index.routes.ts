import express from "express";
import Userroutes from "./user.routes";
import productrouter from "./product.routes";

const routes = express.Router();

routes.use("/users", Userroutes);
routes.use("/products", productrouter);

export default routes;