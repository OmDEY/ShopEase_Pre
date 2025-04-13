const express = require("express");
const router = express.Router();
const { fetchClearanceProducts, applyClearanceSaleDiscount } = require("../controller/clearanceSaleController");

router.get("/fetch-clearance-products", fetchClearanceProducts);
router.put("/apply-clearance-discount/:id", applyClearanceSaleDiscount);

module.exports = router;