import { Product } from '../models/product';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '../data/products.json');


const readData = (): Product[] => {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(rawData).products;
};


const writeData = (data: Product[]): void => {
  fs.writeFileSync(dataFilePath, JSON.stringify({ products: data }, null, 2));
};

export const getAllProducts = (category?: string): Product[] => {
  const products = readData();
  if (category) {
    return products.filter(product => product.category === category && !product.deleted);
  }
  return products.filter(product => !product.deleted);
};

export const getProductById = (id: string): Product | undefined => {
  const products = readData();
  return products.find(product => product.id === id && !product.deleted);
};



export const createProduct = (newProduct: Product): Product => {
  const products = readData();
  newProduct.id = uuidv4();
  products.push(newProduct);
  writeData(products);
  return newProduct;
};


export const updateProduct = (id: string, updatedProduct: Product): Product | undefined => {
  const products = readData();
  const index = products.findIndex(product => product.id === id);
  if (index === -1 || products[index].deleted) return undefined;
  products[index] = { ...products[index], ...updatedProduct };
  writeData(products);
  return products[index];
};

export const partiallyUpdateProduct = (id: string, street: string): Product | undefined => {
  const products = readData();
  const index = products.findIndex(product => product.id === id);
  if (index === -1 || products[index].deleted) return undefined;
  products[index].manufacturer.address.street = street;
  writeData(products);
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = readData();
  const index = products.findIndex(product => product.id === id);
  if (index === -1 || products[index].deleted) return false;
  products[index].deleted = true;
  writeData(products);
  return true;
};
