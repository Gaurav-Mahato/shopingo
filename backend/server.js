import dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import productRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import cors from "cors";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

connectDB();

app.use(cors());
app.use(express.json())

app.use("/api/products", productRoutes);
app.use("/api/users",UserRoutes);
app.use("/api/orders",orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(8080, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
});