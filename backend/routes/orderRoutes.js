import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from "../controllers/orderController.js";
import {admin, protect} from "../middleware/authMiddleware.js";
import express from "express"

const router = express.Router()

router.route("/myorders").get(protect,getMyOrders)
router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders)
router.route("/:id").get(protect,getOrderById)
router.route("/:id/pay").get(protect, updateOrderToPaid)


export default router