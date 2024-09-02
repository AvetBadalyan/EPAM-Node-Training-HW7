import { Request, Response } from "express";
import { Product } from "../models/product";
import * as productService from "../services/productService";
import asyncHandler from "../middleware/asyncHandler";

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const category = req.query.category as string;
    const products = await productService.getAllProducts(category);
    res.json(products);
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    if (!product || product.deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { stock, price } = req.body;
    if (stock.available < 0 || price <= 0) {
      res.status(400).json({ message: "Invalid stock or price values" });
      return;
    }
    const newProduct = req.body as Product;
    const createdProduct = await productService.createProduct(newProduct);

    if (!createdProduct) {
      res.status(400).json({ message: "Product with this ID already exists" });
      return;
    }

    res.status(201).json(createdProduct);
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedProduct = req.body as Product;
    const result = await productService.updateProduct(id, updatedProduct);
    if (!result) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(result);
  }
);

export const partiallyUpdateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const street = req.body.street as string;
    const result = await productService.partiallyUpdateProduct(id, street);
    if (!result) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(result);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await productService.deleteProduct(id);
    if (!result) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(204).json({ message: "Product successfully deleted" });
  }
);
