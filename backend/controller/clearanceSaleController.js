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
      // Calculate the original price
      const originalPrice = product.price;
      const discountedPrice = (product.price - (product.price * product.discountPercentage / 100)); // The price after discount is already set in product.price

      if (!product.clearanceLevel) {
        if (product.stock <= 5) {
          product.clearanceLevel = "final";
        } else if (product.stock <= 10) {
          product.clearanceLevel = "last-chance";
        } else {
          product.clearanceLevel = "limited";
        }
      }

      // Add the originalPrice to the product
      return {
        ...product.toObject(), // Convert Mongoose document to a plain object
        originalPrice,         // Add the original price before discount
        price: discountedPrice, // The current price after applying discount
      };
    });

    res.json(processedProducts);
  } catch (error) {
    console.error("Error fetching clearance products:", error);
    res.status(500).json({ message: "Error fetching clearance items" });
  }
};


const applyClearanceSaleDiscount = async (req, res) => {
  try {
    const { clearanceLevel, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (clearanceLevel) {
      product.clearanceLevel = clearanceLevel;
    }

    if (stock || stock === 0) {
      product.stock = stock;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
}

module.exports = {
  fetchClearanceProducts,
  applyClearanceSaleDiscount
};
