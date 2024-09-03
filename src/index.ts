import express from "express";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/example", (req, res, next) => {
  try {
    res.send(
      '<a href="http://localhost:5000/api/products">Go to Products API</a>'
    );
  } catch (error) {
    next(error);
  }
});

app.use("/api/products", productRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
