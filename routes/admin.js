const express = require('express');
const router = express.Router();
const { loginAdmin, createAdmin, getDashboardData, changePassword } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Admin authentication routes
router.post('/login', loginAdmin);
router.post('/create', createAdmin);

// Protected routes
router.get('/dashboard/counts', authMiddleware, getDashboardData);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;