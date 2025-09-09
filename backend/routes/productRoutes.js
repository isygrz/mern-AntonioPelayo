import express from 'express';
import {
  productsHealth,
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  listProductsAdmin,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/requireRole.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

/**
 * /api/products/*
 * Route order matters:
 * - Static paths (e.g., /health, /admin) before dynamic ones
 * - /slug/:slug before /:id to avoid slug/ID collisions
 */
const router = express.Router();

// Helper: 405 Method Not Allowed
const methodNotAllowed = (allowed) => (req, res) => {
  res.set('Allow', allowed.join(', '));
  return res
    .status(405)
    .json({ message: 'Method Not Allowed', path: req.path, allowed });
};

// Health probe
router.get('/health', productsHealth);
// 405 for unsupported methods on /health
router.all('/health', methodNotAllowed(['GET']));

// Admin/Vendor listing (paginated)
router.get(
  '/admin',
  protect,
  requireRole(['admin', 'vendor']),
  listProductsAdmin
);
// 405 for unsupported methods on /admin
router.all('/admin', methodNotAllowed(['GET']));

// Public reads
router.get('/slug/:slug', getProductBySlug);
// 405 for unsupported methods on /slug/:slug
router.all('/slug/:slug', methodNotAllowed(['GET']));

router.get('/', getProducts);
router.post('/', protect, requireRole(['admin', 'vendor']), createProduct);
// 405 for unsupported methods on '/'
router.all('/', methodNotAllowed(['GET', 'POST']));

router.get('/mobile/:id', verifyMobileSessionMiddleware, getProductById);
// 405 for unsupported methods on /mobile/:id
router.all('/mobile/:id', methodNotAllowed(['GET']));

router.get('/:id', getProductById);
router.put('/:id', protect, requireRole(['admin', 'vendor']), updateProduct);
router.delete('/:id', protect, requireRole(['admin', 'vendor']), deleteProduct);
// 405 for unsupported methods on '/:id'
router.all('/:id', methodNotAllowed(['GET', 'PUT', 'DELETE']));

export default router;
