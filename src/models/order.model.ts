import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";
import { IProduct } from "./product.model";

export interface IOrder extends Document {
  user: IUser["_id"];
  products: { product: IProduct["_id"]; quantity: number }[];
  total: number;
  status: "pending" | "shipped" | "delivered";
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
