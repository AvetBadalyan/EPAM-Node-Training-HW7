import { Request, Response } from "express";
import { Product } from "../models/product";
import * as productService from "../services/productService";
import asyncHandler from "../middleware/asyncHandler";
import { validateProduct, validatePartialProduct } from "../utils/validationUtils";

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
    const newProduct = req.body;

    const validationError = validateProduct(newProduct);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

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
    const updatedProduct = req.body;

    const validationError = validateProduct(updatedProduct, true);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const result = await productService.updateProduct(id, updatedProduct);
    if (!result) {
      res.status(404).json({ message: "Invalid data or product not found" });
      return;
    }
    res.json(result);
  }
);

export const partiallyUpdateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updates = req.body;

    const validationError = validatePartialProduct(updates);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const result = await productService.partiallyUpdateProduct(id, updates);
    if (!result) {
      res.status(404).json({ message: "Product not found or invalid data" });
      return;
    }
    res.json(result);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({
      message: `Product [ID: ${deletedProduct.id} & Name: ${deletedProduct.name}] successfully deleted`
    });
  }
);

