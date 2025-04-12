const express = require("express");
const { getWeekendSpecialProducts } = require("../controller/weekendSpecialProductsController");

const router = express.Router();

// Routes for weekend special products
router.get("/weekend-specials", getWeekendSpecialProducts);

module.exports = router;