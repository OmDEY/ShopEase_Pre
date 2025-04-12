// routes/productRoutes.js

const { Product } = require('../models/product'); // Adjust path as needed

// GET /api/products/new-arrivals?page=1&limit=10
const fetchNewArrivalProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const newArrivals = await Product.find()
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments();

        res.status(200).json({
            success: true,
            message: 'New arrivals fetched successfully',
            data: newArrivals,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching new arrivals'
        });
    }
};

module.exports = { fetchNewArrivalProducts };
