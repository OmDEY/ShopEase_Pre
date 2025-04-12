const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  variantName: { type: String, required: true },
  variantValue: { type: String, required: true },
  priceAdjustment: { type: Number, default: 0 },
});

const AdditionalInfoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  images: [{ type: String }],
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
    categoryDetails: { type: Object, default: {} },
    variants: { type: [VariantSchema], default: [] },
    images: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserReview" }],
    additionalInfo: { type: [AdditionalInfoSchema], default: [] },
    salesCount: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    dealEndsAt: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    clearanceLevel: { type: String, enum: ['limited', 'last-chance', 'final'], default: null },

    // 👇 New fields for Bundle Offers
    isBundleOffer: { type: Boolean, default: false },
    bundleDetails: {
      bundleName: { type: String },
      bundleDescription: { type: String },
      bundlePrice: { type: Number },
      includedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
  },
  { timestamps: true }
);

module.exports = {
  Product: mongoose.model("Product", ProductSchema),
};
