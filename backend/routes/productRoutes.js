import express from 'express';
import {
  productsHealth,
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

/**
 * /api/products/*
 * Route order matters:
 * - Static paths (e.g., /health) before dynamic ones
 * - /slug/:slug before /:id to avoid slug/ID collisions
 */
const router = express.Router();

// Health probe
router.get('/health', productsHealth);

// Public reads
router.get('/slug/:slug', getProductBySlug);
router.get('/', getProducts);
router.get('/mobile/:id', verifyMobileSessionMiddleware, getProductById);
router.get('/:id', getProductById);

// Admin writes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
