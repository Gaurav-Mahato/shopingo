import dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";

connectDB();

app.use(cors());

app.use("/api/products", productRoutes);

app.use(notFound)
app.use(errorHandler);

app.listen(8080, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
});