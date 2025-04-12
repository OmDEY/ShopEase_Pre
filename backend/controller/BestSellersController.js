const { Product } = require('../models/product');
const Category = require('../models/categories');

const fetchBestSellers = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};

    if (category && category !== 'all') {
      // Case-insensitive search for category name
      const categoryDoc = await Category.findOne({
        categoryName: { $regex: `^${category}$`, $options: 'i' }
      });

      if (!categoryDoc) {
        return res.status(404).json({ message: 'Category not found' });
      }

      query.category = categoryDoc._id;
    }

    const bestSellers = await Product.find(query)
      .sort({ salesCount: -1 })
      .limit(12)
      .populate('category', 'categoryName')
      .populate('reviews', 'rating');

    res.json(bestSellers);
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({ message: 'Error fetching best sellers' });
  }
};

module.exports = {
  fetchBestSellers,
};