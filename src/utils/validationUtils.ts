import { Product } from "../models/product";

export const validateProduct = (
  product: Partial<Product>,
  allowPartial = false
): string | null => {
  if (!allowPartial) {
    if (
      !product.name?.trim() ||
      !product.description?.trim() ||
      !product.category?.trim() ||
      !product.stock ||
      (product.manufacturer &&
        (!product.manufacturer.name?.trim() || !product.manufacturer.address))
    ) {
      return "Missing required fields or empty string values";
    }
  }

  // Price validation
  if (
    product.price !== undefined &&
    (typeof product.price !== "number" ||
      isNaN(product.price) ||
      product.price <= 0)
  ) {
    return "Price must be a valid positive number";
  }

  // Stock validation
  if (product.stock?.available !== undefined) {
    if (
      typeof product.stock.available !== "number" ||
      isNaN(product.stock.available) ||
      product.stock.available < 0
    ) {
      return "Stock available must be a valid non-negative number";
    }
  }

  if (product.stock?.reserved !== undefined) {
    if (
      typeof product.stock.reserved !== "number" ||
      isNaN(product.stock.reserved) ||
      product.stock.reserved < 0
    ) {
      return "Stock reserved must be a valid non-negative number";
    }
  }

  // Manufacturer address validation (if manufacturer is provided)
  if (product.manufacturer?.address) {
    const { street, city, zip } = product.manufacturer.address;
    if (!street?.trim() || !city?.trim() || !zip?.trim()) {
      return "Manufacturer address must include non-empty street, city, and zip";
    }
  }

  return null;
};

export const validatePartialProduct = (
  updates: Partial<Product>
): string | null => {
  return validateProduct(updates, true);
};
