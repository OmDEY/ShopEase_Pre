const express = require('express');
const router = express.Router();
const { fetchAllAdmins, registerAdmin, loginAdmin, captureAdminData, getAdminById, verifyAdminToken } = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// router.get('/fetchAllAdmins', fetchAllAdmins)
router.post('/auth/register', registerAdmin)
router.post('/auth/login', loginAdmin)
// router.post('/auth/captureAdminData', captureAdminData)
// router.get('/getAdminById/:id', getAdminById)
router.post('/auth/verify-token', authMiddleware, verifyAdminToken)

module.exports = router;