const express = require('express');
const router = express.Router();
const { loginAdmin, createAdmin, getDashboardData } = require('../controllers/adminController');

// Admin authentication routes
router.post('/login', loginAdmin);
router.post('/create', createAdmin);

// Dashboard routes
router.get('/dashboard/counts', getDashboardData);

module.exports = router;