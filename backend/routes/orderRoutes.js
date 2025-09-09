import express from 'express';
import {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

const router = express.Router();

// Helper: 405 Method Not Allowed
const methodNotAllowed = (allowed) => (req, res) => {
  res.set('Allow', allowed.join(', '));
  return res
    .status(405)
    .json({ message: 'Method Not Allowed', path: req.path, allowed });
};

// Create order
router.post('/', protect, createOrder);
// Admin list all orders
router.get('/', protect, admin, getAllOrders);
// 405 for unsupported methods on '/'
router.all('/', methodNotAllowed(['GET', 'POST']));

// Current user's orders
router.get('/mine', protect, getUserOrders);
// 405 on '/mine'
router.all('/mine', methodNotAllowed(['GET']));

// Mobile session read (guarded by mobile session token)
router.get('/mobile/:id', verifyMobileSessionMiddleware, getOrderById);
// 405 on '/mobile/:id'
router.all('/mobile/:id', methodNotAllowed(['GET']));

// Read by id (auth required)
router.get('/:id', protect, getOrderById);
// 405 on '/:id'
router.all('/:id', methodNotAllowed(['GET']));

export default router;
