import { Product } from "../models/product";
import { v4 as uuidv4 } from "uuid";
import fs from "fs-extra";
import path from "path";

const dataFilePath = path.join(__dirname, "..", "data", "products.json");

const readData = async (): Promise<Product[]> => {
  const rawData = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(rawData).products;
};

const writeData = async (data: Product[]): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify({ products: data }, null, 2));
};

export const getAllProducts = async (category?: string): Promise<Product[]> => {
  const products = await readData();
  return products.filter(
    (product) =>
      !product.deleted && (!category || product.category === category)
  );
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  const products = await readData();
  return products.find((product) => product.id === id && !product.deleted);
};

export const createProduct = async (
  newProduct: Product
): Promise<Product | null> => {
  const products = await readData();
  if (products.some((product) => product.id === newProduct.id)) {
    return null;
  }

  const productWithId: Product = {
    ...newProduct,
    id: newProduct.id || uuidv4(),
  };

  products.push(productWithId);
  await writeData(products);
  return productWithId;
};

export const updateProduct = async (
  id: string,
  updatedProduct: Partial<Product>
): Promise<Product | undefined> => {
  const products = await readData();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1 || products[index].deleted) return undefined;

  products[index] = { ...products[index], ...updatedProduct };
  await writeData(products);
  return products[index];
};

export const partiallyUpdateProduct = async (
  id: string,
  updates: Partial<Product>
): Promise<Product | undefined> => {
  const products = await readData();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1 || products[index].deleted) return undefined;

  const product = products[index];
  const updatedProduct = {
    ...product,
    ...updates,
    manufacturer: updates.manufacturer
      ? {
          ...product.manufacturer,
          ...updates.manufacturer,
          address: updates.manufacturer.address
            ? {
                ...product.manufacturer?.address,
                ...updates.manufacturer.address,
              }
            : product.manufacturer?.address,
        }
      : product.manufacturer,
  };

  products[index] = updatedProduct;
  await writeData(products);
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<Product | null> => {
  const products = await readData();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1 || products[index].deleted) return null;

  const deletedProduct = products[index];
  deletedProduct.deleted = true;
  await writeData(products);
  return deletedProduct;
};
