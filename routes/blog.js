const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getFeaturedBlogs,
  getBlogById,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', getAllBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/:id', getBlogById);

// Admin routes (protected)
router.get('/admin/all', authMiddleware, getAdminBlogs);
router.post('/admin', authMiddleware, createBlog);
router.put('/admin/:id', authMiddleware, updateBlog);
router.delete('/admin/:id', authMiddleware, deleteBlog);

module.exports = router;