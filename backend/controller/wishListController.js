// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');
const { Product } = require('../models/product');

const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if user already has a wishlist
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // Create new wishlist
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
    } else {
      // Add to wishlist only if not already present
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    res.status(200).json({ success: true, message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getWishlist = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  
      if (!wishlist) {
        return res.status(404).json({ success: false, message: 'No wishlist found for user' });
      }
  
      res.status(200).json({ success: true, data: wishlist.products });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  // controllers/wishlistController.js

  const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: 'Missing userId or productId' });
    }
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(404).json({ success: false, message: 'Wishlist not found' });
      }
  
      console.log('wishlist >>>> ', wishlist);
  
      // Filter out the item safely
      wishlist.products = wishlist.products.filter(
        (id) => id && id.toString() !== productId
      );
  
      await wishlist.save();
  
      res.status(200).json({ success: true, message: 'Product removed from wishlist' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

  // controllers/wishlistController.js

  const toggleWishlistItem = async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "Missing userId or productId" });
    }
  
    try {
      let wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        wishlist = new Wishlist({ user: userId, products: [productId] });
      } else {
        const index = wishlist.products.findIndex(
          (id) => id && id.toString() === productId
        );
  
        if (index > -1) {
          wishlist.products.splice(index, 1); // Remove
        } else {
          wishlist.products.push(productId); // Add
        }
      }
  
      await wishlist.save();
      res.status(200).json({ success: true, wishlist });
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  // Check if a product is in the wishlist
  const checkWishlist = async (req, res) => {
    const { userId, productId } = req.params;
  
    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "Missing userId or productId" });
    }
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(200).json({ isInWishlist: false });
      }
  
      const isInWishlist = wishlist.products.some(
        (id) => id && id.toString() === productId
      );
  
      return res.status(200).json({ isInWishlist });
    } catch (error) {
      console.error("Error checking wishlist:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  

  module.exports = { addToWishlist, getWishlist, removeFromWishlist, toggleWishlistItem, checkWishlist };