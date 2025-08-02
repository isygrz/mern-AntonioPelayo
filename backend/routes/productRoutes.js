import express from 'express';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug); // ✅ Must come before `/:id`
router.get('/mobile/:id', verifyMobileSessionMiddleware, getProductById); // ➕ secure fallback
router.get('/:id', getProductById);

// Admin
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
