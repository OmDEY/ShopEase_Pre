const express = require('express');
const router = express.Router();
const { updateDailySales, fetchDailyBestSalesProducts } = require('../controller/dailyBestSalesController');

// Update daily sales status for a product
router.put('/products/:id/daily-sales', updateDailySales);

// Fetch Daily Best Sales products
router.get('/products/daily-best-sales', fetchDailyBestSalesProducts);

module.exports = router;