import asyncHandler from 'express-async-handler';
import Product from "../models/productModel.js";

const getProducts = asyncHandler( async(req,res) => {
    const products = await Product.find({});
    res.json(products);
})

const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if (product){
        res.json(product);
    }
    else{
        res.status(404);
        throw new Error ('Product not found')
    }
})

const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({
            message: 'Product removed'
        })
    }else{
        res.status(404)
        throw new Error('Product Not found')
    }
})

const updateProduct = asyncHandler(async(req,res) => {
    const {name,brand,category, image, price, description, countInStocks} = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.image = image
        product.description = description
        product.price = price
        product.category = category
        product.brand = brand
        product.countInStocks = countInStocks
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export {getProducts, getProductById, deleteProduct, updateProduct}