const express = require('express');
const router = express.Router();
const { uploadBannerCarouselImages, getBannerImages } = require('../controller/homePageDataController.js');
const multer = require('multer');


const storage = multer.memoryStorage(); // Store files in memory buffer temporarily
const upload = multer({ storage: storage });

// Route to upload multiple images and store the URLs in MongoDB
router.post('/upload', upload.array('image'), uploadBannerCarouselImages);
router.get('/fetch', getBannerImages);

module.exports = router;
