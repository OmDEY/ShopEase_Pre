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


module.exports = {
  markAsPopular,
};
