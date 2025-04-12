const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  createCODOrder
} = require("../controller/paymentController");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post('/create-cod-order', createCODOrder);

module.exports = router;