import express from "express";
import Userroutes from "./user.routes";
import productrouter from "./product.routes";
import orderrouter from "./order.routes";

const routes = express.Router();

routes.use("/users", Userroutes);
routes.use("/products", productrouter);
routes.use("/orders", orderrouter);

export default routes;