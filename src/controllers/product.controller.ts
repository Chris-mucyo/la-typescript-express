import { Request, Response } from "express";    
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category, images } = req.body;

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        images,
    });

    res.status(201).json({ message: "Product created", product });
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json(product);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updated){
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json({message: "Product updated", product: updated});
    }catch (error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
        try{
            const deleted = await Product.findByIdAndDelete(req.params.id);
            if(!deleted){
                return res.status(404).json({message: "Product not found"});
            }
           return res.status(200).json({message: "Product deleted"}); 
        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error"});
        }
};