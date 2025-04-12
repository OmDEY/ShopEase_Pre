const { Product } = require("../models/product");

const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      $or: [
        { isFeatured: true },
        { discountPercentage: { $gt: 0 } },
        { averageRating: { $gte: 4 } }, // 💯 works now!
      ],
    })
      .sort({ createdAt: -1 })
      .limit(12)
      .populate("category", "name")
      .populate("reviews", "rating");

    res.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ message: "Error fetching featured products" });
  }
};

module.exports = {
  getFeaturedProducts,
};
