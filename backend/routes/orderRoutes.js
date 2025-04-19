const express = require("express");
const router = express.Router();
const { fetchOrders, fetchAllOrders, updateOrderStatus, sendOrderStatusEmail } = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes for orders
router.get("/fetch-orders", authMiddleware, fetchOrders);
router.get("/fetch-all-orders", authMiddleware, fetchAllOrders);
router.post("/update-order-status/:orderId", authMiddleware, updateOrderStatus);
router.post("/send-order-status-email/:orderId", authMiddleware, sendOrderStatusEmail);

module.exports = router;