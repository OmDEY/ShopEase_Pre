const express = require('express');
const router = express.Router();
const { fetchNewArrivalProducts } = require('../controller/newArrivalController');

router.get('/fetch-new-arrivals', fetchNewArrivalProducts);

module.exports = router;