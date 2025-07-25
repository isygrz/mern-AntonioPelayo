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

router.post('/', protect, createOrder);
router.get('/mine', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.get('/mobile/:id', verifyMobileSessionMiddleware, getOrderById); // ➕ mobile session fallback
router.get('/', protect, admin, getAllOrders);

export default router;
