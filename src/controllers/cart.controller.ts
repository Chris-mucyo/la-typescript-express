import { Request, Response } from 'express';
import Cart from '../models/cart.model';

export const getCart = async (req: Request, res: Response) => {
    try{
        const userId = (req as any).user._id;

        let cart = await Cart.findOne({ user: userId }).populate('items.product');
        if(!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        return res.status(200).json({ cart });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if(!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        return res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    return res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};