const express = require("express");
const router = express.Router();
const { fetchClearanceProducts } = require("../controller/clearanceSaleController");

router.get("/fetch-clearance-products", fetchClearanceProducts);

module.exports = router;