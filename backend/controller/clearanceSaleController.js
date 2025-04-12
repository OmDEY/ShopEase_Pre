const { Product } = require("../models/product");

const fetchClearanceProducts = async (req, res) => {
  try {
    // Get clearance products (high discounts and low stock)
    const clearanceProducts = await Product.find({
      discountPercentage: { $gte: 50 }, // At least 50% off
      stock: { $lte: 20 }, // Low stock
      $or: [
        { clearanceLevel: { $exists: true } },
        { $expr: { $lt: ["$stock", 10] } }, // Auto-mark as clearance if very low stock
      ],
    })
      .sort({
        discountPercentage: -1,
        stock: 1, // Show lowest stock first
      })
      .limit(24);

    // Auto-assign clearance levels if not set
    const processedProducts = clearanceProducts.map((product) => {
      if (!product.clearanceLevel) {
        if (product.stock <= 5) {
          product.clearanceLevel = "final";
        } else if (product.stock <= 10) {
          product.clearanceLevel = "last-chance";
        } else {
          product.clearanceLevel = "limited";
        }
      }
      return product;
    });

    res.json(processedProducts);
  } catch (error) {
    console.error("Error fetching clearance products:", error);
    res.status(500).json({ message: "Error fetching clearance items" });
  }
};

module.exports = {
  fetchClearanceProducts,
};
