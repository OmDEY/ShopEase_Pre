const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5, // Assuming a star rating of 0 to 5
        set: v => Math.round(v * 2) / 2 // Allowing half-star ratings (e.g., 1.5)
    },
    review: {
        type: String,
        required: true,
        trim: true,
        minlength: 1, // At least 1 character
        maxlength: 1000 // Maximum length of the review
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the 'updatedAt' field on each save
reviewSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create and export the Review model
const UserReview = mongoose.model('UserReview', reviewSchema);

module.exports = UserReview;
