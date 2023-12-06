import express from "express";
import {authUser,deleteUsers,getUserProfile,getUsers,registerUser, updateUserProfile, getUserById, updateUser} from "../controllers/userController.js";
import {admin, protect} from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").post(registerUser).get(getUsers)
router.route("/login").post(authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/:id").delete(protect,admin,deleteUsers).get(protect, admin, getUserById).put(protect,admin,updateUser)

export default router;