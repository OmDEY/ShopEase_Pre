const express = require('express');
const router = express.Router();

const { getDealsOfTheDay } = require('../controller/DealOfTheDayController');

// Routes for deals of the day
router.get('/deals-of-the-day', getDealsOfTheDay);

module.exports = router;