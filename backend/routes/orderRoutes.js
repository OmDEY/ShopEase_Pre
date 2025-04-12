const express = require("express");
const router = express.Router();
const { fetchOrders, fetchAllOrders, updateOrderStatus } = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes for orders
router.get("/fetch-orders", authMiddleware, fetchOrders);
router.get("/fetch-all-orders", authMiddleware, fetchAllOrders);
router.post("/update-order-status/:orderId", authMiddleware, updateOrderStatus);

module.exports = router;