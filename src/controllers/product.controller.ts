import { Request, Response } from "express";    
import Product from "../models/product.model";
import { AuthRequest } from "../middlewares/auth.middleware";


// Extend Request type to include files from Multer
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

export const createProduct = async (req: MulterRequest, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Handle uploaded images
    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map(file => file.path); // Multer + Cloudinary sets path
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Create product error:", error);
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

export const updateProduct = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    // 1️⃣ Handle uploaded images
    let images: string[] = [];

    // Multer stores uploaded files in req.files
    if (req.files && Array.isArray(req.files)) {
      // file.path is the Cloudinary URL
      images = req.files.map((file: Express.Multer.File & { path?: string }) => file.path || "");
    }

    // 2️⃣ Prepare updated data
    // Only include images if there are new uploads
    const updateData: any = { ...req.body };
    if (images.length > 0) {
      updateData.images = images;
    }

    // 3️⃣ Update product in DB
    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated successfully", product: updated });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


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