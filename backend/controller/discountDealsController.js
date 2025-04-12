const { Product } = require('../models/product');

const fetchDiscountDeals = async (req, res) => {
    try {
        const discountDeals = await Product.find({
            discountPercentage: { $gt: 0 }
        })
            .sort({ discountPercentage: -1 })
            .limit(12)
            .populate('category', 'name')
            .populate('reviews', 'rating');

        res.json(discountDeals);
    } catch (error) {
        console.error('Error fetching discount deals:', error);
        res.status(500).json({ message: 'Error fetching discount deals' });
    }
};

module.exports = { fetchDiscountDeals };