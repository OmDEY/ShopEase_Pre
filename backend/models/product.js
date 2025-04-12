const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  variantName: { type: String, required: true },
  variantValue: { type: String, required: true },
  priceAdjustment: { type: Number, default: 0 }, // Optional price adjustment for variants
});

const AdditionalInfoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
});

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    stock: { type: Number, required: true },
    brand: { type: String, required: true, index: true },
    colors: [{ type: String }],
    categoryDetails: { type: Object, default: {} }, // Object containing all the details for the category
    variants: { type: [VariantSchema], default: [] },
    images: [{ type: String }], // Array of image URLs
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserReview" }],
    additionalInfo: { type: [AdditionalInfoSchema], default: [] }, // <-- Fix here: make it an array of objects
    salesCount: { type: Number, default: 0 }, // <-- Add this
    discountPercentage: { type: Number, default: 0 },
    dealEndsAt: { type: Date, required: false},
    createdAt: { type: Date, default: Date.now,},
  },
  { timestamps: true }
);

module.exports = {
  Product: mongoose.model("Product", ProductSchema),
};
