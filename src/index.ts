import express from "express";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from './middleware/errorMiddleware';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/products", productRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
