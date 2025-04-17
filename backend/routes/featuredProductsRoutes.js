const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imageUpload");

const { getFeaturedProducts, markAsFeatured } = require("../controller/featuredProductsController");

router.get("/fetch-featured-products", getFeaturedProducts);

router.post("/add-featured-product", imageUpload, markAsFeatured);

module.exports = router;