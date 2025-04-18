const { Product } = require("../models/product"); // adjust if needed

const markAsPopular = async (req, res) => {
  try {
    const productId = req.params.id;
    const { isPopular } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { "dailySales.isPopular": isPopular },
      { new: true }
    );

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update popular status" });
  }
};

const fetchPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Product.find({ 'dailySales.isPopular': true })
      .populate('category', 'name') // optional: populate category name if needed
      .sort({ averageRating: -1 })  // sort by rating
      .limit(30); // fetch top 30

    res.status(200).json(popularProducts);
  } catch (error) {
    console.error('Error fetching popular products:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  markAsPopular,
  fetchPopularProducts
};
