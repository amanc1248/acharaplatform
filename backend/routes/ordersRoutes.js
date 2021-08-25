import express from "express";
import { getOrderById, insertOrder } from "../controllers/ordersControllers.js";

const router = express.Router();

// @desc Fetch all orders
// @route Get/api/orders
// @access Private/Tailor

// router.get("/", orderControllers.fetchOrders);

// @desc Fetch all orderById
// @route Get/api/orders/:id
// @access Private/Tailor

// router.get("/:orderId", orderControllers.fetchOrderById);

// @desc Post orders
// @route Post/api/orders
// @access Public

router.post("/", insertOrder);
router.get("/getParticularOrder/:id", getOrderById);

// @desc Delete orders
// @route Delete/api/products/:id
// @access Private/Tailor

// router.delete("/:id", orderControllers.deleteOrder);

export default router;
