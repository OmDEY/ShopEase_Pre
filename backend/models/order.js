// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
      rating: { type: Number, default: 0 },
      review: { type: String, default: "" },

      isReturnRequested: { type: Boolean, default: false },
      returnStatus: {
        type: String,
        enum: [
          "None",
          "Requested",
          "Approved",
          "Rejected",
          "Returned",
          "Refunded",
        ],
        default: "None",
      },
      returnReason: { type: String, default: "" },
      returnRequestDate: { type: Date },
    },
  ],
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Razorpay", "Visa", "Mastercard", "Amex", "PayPal"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Refunded"],
    default: "Pending",
  },
  totalAmount: Number,

  // Order lifecycle
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  deliveryDate: Date,
  shippingDate: Date,
  estimatedDelivery: Date,
  cancellationDate: Date,

  // Invoice
  invoiceUrl: { type: String }, // Cloudinary URL
  invoicePublicId: { type: String }, // For deletion if needed

  // Tracking
  trackingNumber: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
