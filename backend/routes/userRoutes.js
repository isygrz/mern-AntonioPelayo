import express from 'express';
import {
  checkEmailStatus,
  loginUser,
  registerUser,
  getProfile,
} from '../controllers/userController.js';
import { logout as logoutController } from '../controllers/authLogoutController.js';

const router = express.Router();

// Smart pre-check (public)
router.post('/check-email', checkEmailStatus);

// Auth endpoints (public -> set auth cookie)
router.post('/login', loginUser);
router.post('/register', registerUser);

// Session/profile (reads cookie)
router.get('/profile', getProfile);

// Logout (clears httpOnly cookie server-side)
router.post('/logout', logoutController);

export default router;
