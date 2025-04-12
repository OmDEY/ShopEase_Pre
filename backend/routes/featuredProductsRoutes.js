const express = require("express");
const router = express.Router();

const { getFeaturedProducts } = require("../controller/featuredProductsController");

router.get("/fetch-featured-products", getFeaturedProducts);

module.exports = router;