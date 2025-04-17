const express = require("express");
const router = express.Router();
const { markAsPopular } = require("../controller/PopularProductsController");
const imageUpload = require("../middleware/imageUpload");

router.post("/admin-add-popular-products", imageUpload, markAsPopular);

module.exports = router;