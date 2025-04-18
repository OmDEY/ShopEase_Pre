const express = require("express");
const router = express.Router();

// Import controller functions
const { fetchFeaturedCategoriesProducts, fetchCategories } = require("../controller/featuredCategoriesController");

// Routes for fetching featured categories products
router.get("/fetch-featured-categories-products", fetchFeaturedCategoriesProducts);
router.get("/fetch-categories", fetchCategories);


module.exports = router;