const express = require("express");
const router = express.Router();

const { getBundleOffers, updateBundleOffer } = require("../controller/BundleOffersController");

router.get("/fetch-bundle-offers", getBundleOffers);
router.put("/update-bundle-offer/:id", updateBundleOffer);

module.exports = router;