const express = require("express");
const router = express.Router();
const { fetchOrders, fetchAllOrders, updateOrderStatus, sendOrderStatusEmail, getAllReturnRequests, updateReturnRequestStatus, cancelOrder, fetchCancelledOrders, processRefundForCancelledOrder, restockCancelledProducts, deleteCancelledOrder } = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes for orders
router.get("/fetch-orders", authMiddleware, fetchOrders);
router.get("/fetch-all-orders", authMiddleware, fetchAllOrders);
router.post("/update-order-status/:orderId", authMiddleware, updateOrderStatus);
router.post("/send-order-status-email/:orderId", authMiddleware, sendOrderStatusEmail);

router.get("/get-all-return-requests", authMiddleware, getAllReturnRequests);
router.post("/update-return-request-status/:orderId/:productId", authMiddleware, updateReturnRequestStatus);

// Routes for order cancellation
router.post("/cancel-order/:id", authMiddleware, cancelOrder);

// Routes for cancelled orders
router.get("/fetch-cancelled-orders", authMiddleware, fetchCancelledOrders);
router.put("/process-refund/:id", authMiddleware, processRefundForCancelledOrder);
router.put("/restock-items/:id", authMiddleware, restockCancelledProducts);
router.delete("/delete-cancelled-order/:id", authMiddleware, deleteCancelledOrder);

module.exports = router;