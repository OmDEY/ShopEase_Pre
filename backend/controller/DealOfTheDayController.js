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

    res.json(deals);
  } catch (error) {
    console.error("Error fetching deals of the day:", error);
    res.status(500).json({ message: "Error fetching deals of the day" });
  }
};

module.exports = {
  getDealsOfTheDay,
};
