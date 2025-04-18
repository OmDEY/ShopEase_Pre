const cloudinary = require('../config/cloudinary'); // adjust path
const streamifier = require('streamifier');
const { Product } = require("../models/product");

const getFeaturedProducts = async (req, res) => {
  try {
    // Fetch featured products from the database
    const featuredProducts = await Product.find({
      $or: [
        { isFeatured: true },
        { discountPercentage: { $gt: 0 } },
        { averageRating: { $gte: 4 } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(12)
      .populate("category", "name")
      .populate("reviews", "rating");

    // Helper function to calculate discounted price
    const applyDiscount = (originalPrice, discountPercentage) => {
      return originalPrice - (originalPrice * discountPercentage) / 100;
    };

    // Map through the products and add the originalPrice and discounted price
    const featuredProductsWithDiscounts = featuredProducts.map((product) => {
      const originalPrice = product.price;
      const discountedPrice = applyDiscount(originalPrice, product.discountPercentage);

      return {
        ...product.toObject(),
        originalPrice,  // Adding original price
        price: discountedPrice,  // Adding discounted price
      };
    });

    res.json(featuredProductsWithDiscounts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ message: "Error fetching featured products" });
  }
};

const markAsFeatured = async (req, res) => {
  try {
    const productId = req.params.id;
    const { isFeatured } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { "dailySales.isFeatured": isFeatured },
      { new: true }
    );

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};



module.exports = {
  getFeaturedProducts,
  markAsFeatured,
};
