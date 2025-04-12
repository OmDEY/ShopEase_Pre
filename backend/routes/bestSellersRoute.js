const express = require('express');
const router = express.Router();
const { fetchBestSellers } = require('../controller/BestSellersController');

router.get('/fetch-best-sellers', fetchBestSellers);

module.exports = router;