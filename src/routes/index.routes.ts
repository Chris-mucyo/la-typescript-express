import express from "express";
import Userroutes from "./user.routes";
import productrouter from "./product.routes";
import orderrouter from "./order.routes";
import cartrouter from "./cart.routes";

const routes = express.Router();

routes.use("/users", Userroutes);
routes.use("/products", productrouter);
routes.use("/orders", orderrouter);
routes.use("/cart", cartrouter);

export default routes;