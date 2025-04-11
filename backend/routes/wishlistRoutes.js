const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlist, removeFromWishlist, toggleWishlistItem, checkWishlist } = require('../controller/wishListController');

router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.post('/toggle', toggleWishlistItem);
router.get('/:userId', getWishlist);
router.get('/check/:userId/:productId', checkWishlist);

module.exports = router;
