const { Product } = require("../models/product");

const getWeekendSpecialProducts = async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const dealWindowEnd = new Date(
      todayEnd.getTime() + 2 * 24 * 60 * 60 * 1000
    ); // 2 days ahead

    // Helper function to calculate discounted price
    const applyDiscount = (originalPrice, discountPercentage) => {
      return originalPrice - (originalPrice * discountPercentage) / 100;
    };

    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      // ✅ It’s weekend, show current deals
      const weekendDeals = await Product.find({
        discountPercentage: { $gt: 15 },
        dealEndsAt: {
          $gte: todayStart,
          $lte: dealWindowEnd,
        },
      })
        .sort({ discountPercentage: -1 })
        .limit(12);

      // Add originalPrice and apply discount
      const weekendDealsWithDiscounts = weekendDeals.map((product) => {
        const originalPrice = product.price;
        const discountedPrice = applyDiscount(originalPrice, product.discountPercentage);

        return {
          ...product.toObject(),
          originalPrice,
          price: discountedPrice,
        };
      });

      return res.json(weekendDealsWithDiscounts);
    }

    // 🕑 Not weekend — show upcoming Friday deals
    const nextFriday = new Date();
    nextFriday.setDate(
      nextFriday.getDate() + ((5 + 7 - nextFriday.getDay()) % 7)
    );
    nextFriday.setHours(0, 0, 0, 0);

    const upcomingDeals = await Product.find({
      discountPercentage: { $gt: 15 },
      dealEndsAt: { $gte: nextFriday },
    })
      .sort({ discountPercentage: -1 })
      .limit(4);

    // Add originalPrice and apply discount
    const upcomingDealsWithDiscounts = upcomingDeals.map((product) => {
      const originalPrice = product.price;
      const discountedPrice = applyDiscount(originalPrice, product.discountPercentage);

      return {
        ...product.toObject(),
        originalPrice,
        price: discountedPrice,
      };
    });

    return res.json(upcomingDealsWithDiscounts);
  } catch (error) {
    console.error("Error fetching weekend specials:", error);
    res.status(500).json({ message: "Error fetching weekend deals" });
  }
};

module.exports = {
  getWeekendSpecialProducts,
};