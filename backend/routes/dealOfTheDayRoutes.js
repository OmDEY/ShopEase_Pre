const express = require('express');
const router = express.Router();

const { getDealsOfTheDay, getTopDealsOfTheDay } = require('../controller/DealOfTheDayController');

// Routes for deals of the day
router.get('/deals-of-the-day', getDealsOfTheDay);
router.get('/top-deals-of-the-day', getTopDealsOfTheDay);

module.exports = router;