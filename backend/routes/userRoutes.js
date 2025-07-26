import express from 'express';
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUserProfile,
  checkEmail, // ✅ Renamed & updated
  getUsers,
  approveVendor,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/mobile', verifyMobileSessionMiddleware, getUserProfile);

// ✅ Switched to GET method
router.get('/check-email', checkEmail);

// 🔐 Admin-only routes
router.get('/', protect, admin, getUsers);
router.patch('/:id/approve', protect, admin, approveVendor);

export default router;
