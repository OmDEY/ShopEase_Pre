const { Product } = require("../models/product");

const getBundleOffers = async (req, res) => {
  try {
    const bundles = await Product.find({ isBundleOffer: true })
      .populate("bundleDetails.includedProducts", "title price images")
      .sort({ createdAt: -1 });

    res.json(bundles);
  } catch (err) {
    console.error("Error fetching bundle offers:", err);
    res.status(500).json({ message: "Error fetching bundle offers" });
  }
};

// Update Bundle Offer Details
const updateBundleOffer = async (req, res) => {
  const productId = req.params.id; // Product ID from the URL
  const { isBundleOffer, bundleDetails } = req.body; // Data to update

  try {
    // Find the product by its ID

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the isBundleOffer flag and bundleDetails if provided
    product.isBundleOffer = isBundleOffer;

    if (bundleDetails) {
      product.bundleDetails = {
        ...product.bundleDetails,
        ...bundleDetails, // Merge existing and new bundle details
      };
    }

    // Save the updated product
    await product.save();

    res.json({ message: "Product bundle offer updated successfully", product });
  } catch (error) {
    console.error("Error updating bundle offer:", error);
    res.status(500).json({ message: "Error updating bundle offer" });
  }
};


module.exports = {
  getBundleOffers,
  updateBundleOffer,
};
