const express = require('express');
const router = express.Router();
const { fetchAllUsers, registerUser, loginUser, captureUserData, getUserById, verifyToken } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/fetchAllUsers', fetchAllUsers)
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/captureUserData', captureUserData)
router.get('/getUserById/:id', getUserById)
router.get('/auth/verify-token', authMiddleware, verifyToken)

module.exports = router;