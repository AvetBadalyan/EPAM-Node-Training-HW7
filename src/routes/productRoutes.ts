import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  partiallyUpdateProduct,
} from "../controllers/productController";
import checkValidId from "../middleware/checkObjectId";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", checkValidId, getProductById);
router.post("/", createProduct);
router.put("/:id", checkValidId, updateProduct);
router.patch("/:id", checkValidId, partiallyUpdateProduct);
router.delete("/:id", checkValidId, deleteProduct);

export default router;
