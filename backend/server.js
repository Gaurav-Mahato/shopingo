import dotenv from "dotenv";
dotenv.config()
import express from "express";

import path from 'path'
import productRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import cors from "cors";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import morgan from "morgan"

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
connectDB();
const __dirname = path.resolve()
app.use(cors());
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use("/api/products", productRoutes);
app.use("/api/users",UserRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(8080, ()=>{
    console.log(`Server running at port ${process.env.PORT}`);
});