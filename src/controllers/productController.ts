import { Request, Response } from 'express';
import { Product } from '../models/product';
import * as productService from '../services/productService';
import asyncHandler from '../middleware/asyncHandler';

export const getAllProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const category = req.query.category as string;
    const products = await productService.getAllProducts(category);
    res.json(products);
  });
  

export const getProductById = (req: Request, res: Response): void => {
  const id = req.params.id;
  const product = productService.getProductById(id);
  if (!product || product.deleted) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(product);
};

export const createProduct = (req: Request, res: Response): void => {
    const { stock, price } = req.body;
    if (stock.available < 0 || price <= 0) {
      res.status(400).json({ message: 'Invalid stock or price values' });
      return;
    }
    const newProduct = req.body as Product;
    const createdProduct = productService.createProduct(newProduct);
    res.status(201).json(createdProduct);
  };
  

export const updateProduct = (req: Request, res: Response): void => {
  const id = req.params.id;
  const updatedProduct = req.body as Product;
  const result = productService.updateProduct(id, updatedProduct);
  if (!result) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(result);
};

export const partiallyUpdateProduct = (req: Request, res: Response): void => {
  const id = req.params.id;
  const street = req.body.street as string;
  const result = productService.partiallyUpdateProduct(id, street);
  if (!result) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(result);
};

export const deleteProduct = (req: Request, res: Response): void => {
    const id = req.params.id;
    const result = productService.deleteProduct(id);
    if (!result) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(204).json({ message: 'Product successfully deleted' });
  };
  
