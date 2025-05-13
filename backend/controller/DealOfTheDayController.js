const express = require("express");
const { Product } = require("../models/product");

// In your backend (Node.js/Express)
const getDealsOfTheDay = async (req, res) => {
  try {
    // Get products with deals ending today, sorted by discount percentage
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const deals = await Product.find({
      dealEndsAt: {
        $gte: today,
        $lt: tomorrow,
      },
      discountPercentage: { $gt: 0 },
    })
      .sort({ discountPercentage: -1, createdAt: -1 })
      .limit(12)
      .populate("category", "name")
      .populate("reviews", "rating");

    // Add originalPrice and price (discounted price) to each product
    const dealsWithPrices = deals.map((product) => {
      const originalPrice = product.price;
      const price = originalPrice * (1 - product.discountPercentage / 100);
      return {
        ...product.toObject(),
        originalPrice,  // Add original price
        price,          // Add discounted price
      };
    });

    res.json(dealsWithPrices);
  } catch (error) {
    console.error("Error fetching deals of the day:", error);
    res.status(500).json({ message: "Error fetching deals of the day" });
  }
};

// Get top 4 products from deals of the day
const getTopDealsOfTheDay = async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const topDeals = await Product.find({
      dealEndsAt: {
        $gte: today,
        $lt: tomorrow,
      },
      discountPercentage: { $gt: 0 },
    })
      .sort({ discountPercentage: -1, createdAt: -1 })
      .limit(4)
      .populate("category", "name")
      .populate("reviews", "rating");

    // Add originalPrice and price (discounted price) to each product
    const topDealsWithPrices = topDeals.map((product) => {
      const originalPrice = product.price;
      const price = originalPrice * (1 - product.discountPercentage / 100);
      return {
        ...product.toObject(),
        originalPrice,  // Add original price
        price,          // Add discounted price
      };
    });

    res.json(topDealsWithPrices);
  } catch (error) {
    console.error("Error fetching top deals of the day:", error);
    res.status(500).json({ message: "Error fetching top deals of the day" });
  }
};


module.exports = {
  getDealsOfTheDay,
  getTopDealsOfTheDay
};
