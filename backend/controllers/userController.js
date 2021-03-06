import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;    
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password,user.password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

const getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(404);
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    const salt = bcrypt.genSalt(10)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = bcrypt.hash(req.body.password,salt)
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })    
    }
    else{
        res.status(404);
        throw new Error('User not found')
    }
})

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email});
    const salt = await bcrypt.genSalt(10);
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password,salt)
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUsers = asyncHandler(async(req,res) => {
    const users = await User.find({})
    res.json(users)
})

const deleteUsers = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({
            message: "User removed"
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

const getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email,
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUsers, getUserById, updateUser}