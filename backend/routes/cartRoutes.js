const express = require('express');
const router = express.Router();
const { addToCart, getCart, deleteCartItem, updateCartItem } = require('../controller/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addToCart', authMiddleware, addToCart)
router.get('/getCart', authMiddleware ,getCart)
router.delete('/deleteCartItem/:productId', authMiddleware, deleteCartItem)
router.put('/updateCartItem', authMiddleware, updateCartItem)

module.exports = router