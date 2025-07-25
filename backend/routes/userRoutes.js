import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  checkEmailExists,
  getUsers,
  approveVendor,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/mobile', verifyMobileSessionMiddleware, getUserProfile); // ➕ guest mobile fallback
router.post('/check-email', checkEmailExists);

// 🔐 Admin-only routes
router.get('/', protect, admin, getUsers);
router.patch('/:id/approve', protect, admin, approveVendor);

export default router;
