import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import {
  registerUser,
  loginUser,
  getUserProfile,
  checkEmail,
  getUsers,
  approveVendor,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';

// ✅ Correct method: POST w/ body validation
router.post(
  '/check-email',
  body('email').isEmail().withMessage('Valid email required'),
  checkEmail
);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/mobile', verifyMobileSessionMiddleware, getUserProfile);
router.get('/', protect, admin, getUsers);
router.patch('/:id/approve', protect, admin, approveVendor);

export default router;
