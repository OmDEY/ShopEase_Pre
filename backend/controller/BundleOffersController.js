const { Product } = require("../models/product");

const getBundleOffers = async (req, res) => {
  try {
    const bundles = await Product.find({ isBundleOffer: true })
      .populate("includedProducts", "title price images") // Optional: load product info
      .sort({ createdAt: -1 });

    res.json(bundles);
  } catch (err) {
    console.error("Error fetching bundle offers:", err);
    res.status(500).json({ message: "Error fetching bundle offers" });
  }
};

module.exports = {
  getBundleOffers,
};
