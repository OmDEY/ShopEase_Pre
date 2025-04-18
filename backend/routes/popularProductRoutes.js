const express = require("express");
const router = express.Router();
const { markAsPopular, fetchPopularProducts } = require("../controller/PopularProductsController");

router.post("/admin-add-popular-products/:id", markAsPopular);
router.get("/fetch-popular-products", fetchPopularProducts);

module.exports = router;