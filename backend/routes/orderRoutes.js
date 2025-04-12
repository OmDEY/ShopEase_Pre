const express = require("express");
const router = express.Router();
const { fetchOrders } = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes for orders
router.get("/fetch-orders", authMiddleware, fetchOrders);

module.exports = router;