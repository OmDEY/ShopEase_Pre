const Order = require("../models/order");

const fetchOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id })
        .populate("items.product"); // 👈 this populates product details in each item
  
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  };

module.exports = {
  fetchOrders,
};