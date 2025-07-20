import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetch product by slug — this route must be above the `/:id` route
router.get('/slug/:slug', getProductBySlug);

// Product collection routes
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

// Product by ID
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
