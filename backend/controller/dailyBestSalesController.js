const { Product } = require('../models/product');


const updateDailySales = async (req, res) => {
    try {
      const { id } = req.params;
      const { type, value } = req.body;
  
      if (!['isFeatured', 'isPopular', 'isNewlyAdded'].includes(type)) {
        return res.status(400).json({ message: "Invalid type" });
      }
  
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      product.dailySales[type] = value;
      await product.save();
  
      return res.status(200).json({ message: `Updated ${type} status`, product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const fetchDailyBestSalesProducts = async (req, res) => {
    try {
      const [featured, popular, newlyAdded] = await Promise.all([
        Product.find({ "dailySales.isFeatured": true }).limit(10),
        Product.find({ "dailySales.isPopular": true }).limit(10),
        Product.find({ "dailySales.isNewlyAdded": true }).limit(10),
      ]);
  
      res.json({
        featured,
        popular,
        newlyAdded,
      });
    } catch (err) {
      console.error("Error fetching Daily Best Sales:", err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  
  module.exports = {
    updateDailySales,
    fetchDailyBestSalesProducts
  }