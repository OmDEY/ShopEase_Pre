const Order = require("../models/order");
const User = require("../models/user");
const { addOrderStatusEmail } = require("../Queue/emailQueue");

const fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("user") // Populate user name and email
      .populate("items.product"); // Populate product details

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

const sendOrderStatusEmail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("order >>>", order);

    console.log(
      order.user.firstName || order.user.name || order.user.fullName || ""
    );

    // Add order status email to queue
    addOrderStatusEmail({
      email: order.user.email,
      firstName:
        order.user.firstName || order.user.name || order.user.fullName || "",
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
};

const getAllReturnRequests = async (req, res) => {
  try {
    // Fetch only orders that have at least one item with a return requested
    const ordersWithReturns = await Order.find({
      "items.isReturnRequested": true,
    })
      .populate("user", "firstName lastName email")
      .populate("items.product", "title brand price image");

    const returnRequests = [];

    for (const order of ordersWithReturns) {
      for (const item of order.items) {
        if (item.isReturnRequested) {
          returnRequests.push({
            orderId: order._id,
            orderDate: order.createdAt,
            user: order.user,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            returnStatus: item.returnStatus,
            returnReason: item.returnReason,
            additionalInfo: item.additionalInfo || "",
            returnRequestDate: item.returnRequestDate,
            returnImages: item.returnImages,
            shippingAddress: order.shippingAddress,
          });
        }
      }
    }

    res.status(200).json({ returnRequests });
  } catch (error) {
    console.error("Failed to fetch return requests:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching return requests" });
  }
};

const updateReturnRequestStatus = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { status } = req.body;

    // Validate input
    if (
      !["Requested", "Approved", "Rejected", "Returned", "Refunded"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "Invalid return status" });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Find the specific product item in the order
    const item = order.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Product not found in order" });

    // Update return status
    item.returnStatus = status;

    // If status is "Rejected", reset flags
    if (status === "Rejected") {
      item.isReturnRequested = false;
    }

    await order.save();

    res
      .status(200)
      .json({
        message: "Return request updated successfully",
        updatedStatus: item.returnStatus,
      });
  } catch (error) {
    console.error("Error updating return request status:", error);
    res
      .status(500)
      .json({ message: "Server error while updating return status" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { cancelReason, cancelledBy = "User" } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only allow cancellation if not already delivered or cancelled
    if (["Delivered", "Cancelled"].includes(order.orderStatus)) {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    order.orderStatus = "Cancelled";
    order.cancellation = {
      isCancelled: true,
      cancelledAt: new Date(),
      cancelledBy,
      cancelReason,
    };
    order.cancellationDate = new Date();

    // Optionally refund if payment was made
    // if (order.paymentStatus === "Paid") {
    //   order.paymentStatus = "Refunded";
    //   // TODO: Integrate refund API here if needed
    // }

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchCancelledOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: "Cancelled" })
      .populate("user")
      .populate("items.product");
    return res.json(orders);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const processRefundForCancelledOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "Refunded")
      return res.status(400).json({ message: "Refund already processed" });

    order.paymentStatus = "Refunded";
    await order.save();

    res.json({ message: "Refund processed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const restockCancelledProducts = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update product stock (assuming product has `countInStock` field)
    for (const item of order.items) {
      if (item.product) {
        item.product.countInStock =
          (item.product.countInStock || 0) + item.quantity;
        await item.product.save();
      }
    }

    res.json({ message: "Items restocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteCancelledOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus !== "Cancelled")
      return res
        .status(400)
        .json({ message: "Only cancelled orders can be deleted" });

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  fetchOrders,
  fetchAllOrders,
  updateOrderStatus,
  sendOrderStatusEmail,
  getAllReturnRequests,
  updateReturnRequestStatus,
  cancelOrder,
  fetchCancelledOrders,
  processRefundForCancelledOrder,
  restockCancelledProducts,
  deleteCancelledOrder,
};
