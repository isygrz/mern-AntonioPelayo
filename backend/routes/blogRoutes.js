import express from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllBlogs);
router.route('/slug/:slug').get(getBlogBySlug);

// Protected admin routes
router.route('/').post(protect, admin, createBlog);
router
  .route('/:id')
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
