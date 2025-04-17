const express = require('express');
const router = express.Router();
const { updateDailySales } = require('../controller/dailyBestSalesController');

// Update daily sales status for a product
router.put('/products/:id/daily-sales', updateDailySales);

module.exports = router;