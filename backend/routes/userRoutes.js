const express = require('express');
const router = express.Router();
const { fetchAllUsers, registerUser, loginUser, captureUserData, getUserById, verifyToken, addShippingAddress, addToNewsletterEmail, contactSupport } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/fetchAllUsers', fetchAllUsers)
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/captureUserData', captureUserData)
router.get('/getUserById/:id', getUserById)
router.get('/auth/verify-token', authMiddleware, verifyToken)
router.post('/addShippingAddress', authMiddleware, addShippingAddress);
router.post('/addToNewsletterEmail', addToNewsletterEmail);
router.post('/contact', contactSupport)

module.exports = router;