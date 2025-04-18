const Category = require("../models/categories");
const { Product } = require("../models/product");

const fetchCategories = async (req, res) => {
    try {
      const categories = await Category.find().select('categoryName');
      res.status(200).json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ message: 'Failed to fetch categories' });
    }
  }

const fetchFeaturedCategoriesProducts = async (req, res) => {
    try {
      const { categoryId } = req.query;
      const filter = {};
      if (categoryId) filter.category = categoryId;
  
      const products = await Product.find(filter)
        .select('title price images')
        .populate('category', 'categoryName');
  
      // Normalize output
      const result = products.map(p => ({
        _id: p._id,
        title: p.title,
        price: p.price,
        image: p.images[0] || '',
        categoryName: p.category.categoryName
      }));
  
      res.status(200).json(result);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  };

  module.exports = {
    fetchFeaturedCategoriesProducts,
    fetchCategories,
  };