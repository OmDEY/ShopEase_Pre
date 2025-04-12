const express = require('express');
const router = express.Router();
const { fetchDiscountDeals } = require('../controller/discountDealsController');

router.get('/fetch-discount-deals', fetchDiscountDeals);

module.exports = router;