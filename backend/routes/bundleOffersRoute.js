const express = require("express");
const router = express.Router();

const { getBundleOffers } = require("../controller/BundleOffersController");

router.get("/fetch-bundle-offers", getBundleOffers);

module.exports = router;