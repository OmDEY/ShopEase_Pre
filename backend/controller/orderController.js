const Order = require("../models/order");
const User = require("../models/user");
const { addOrderStatusEmail } = require('../Queue/emailQueue');

const fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    ); // 👈 this populates product details in each item

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // Populate user name and email
      .populate("items.product", "title price images"); // Populate product details
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const adminId = req.user._id;

  const admin = await User.findById(adminId);

  if (!admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;

    // Optional: Update corresponding dates
    if (status === "Shipped") {
      order.shippingDate = new Date();
    } else if (status === "Delivered") {
      order.deliveryDate = new Date();
    } else if (status === "Cancelled") {
      order.cancellationDate = new Date();
    }

    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Failed to update order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const sendOrderStatusEmail = async(req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log('order >>>', order)

    console.log(order.user.firstName || order.user.name || order.user.fullName || '')

    // Add order status email to queue
    addOrderStatusEmail({
      email: order.user.email,
      firstName: order.user.firstName || order.user.name || order.user.fullName || '',
      orderId: order._id.toString().slice(-6), // show only last 6 chars
      orderStatus: order.orderStatus,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      trackingNumber: order.trackingNumber || "",
  });

    res.status(200).json({ message: "Order status email added to queue" });
  } catch (error) {
    console.error("Failed to add order status email to queue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  fetchOrders,
  fetchAllOrders,
  updateOrderStatus,
  sendOrderStatusEmail,
};
