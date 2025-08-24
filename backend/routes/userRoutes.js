import express from 'express';
import {
  checkEmailStatus,
  loginUser,
  registerUser,
  getProfile,
} from '../controllers/userController.js';

const router = express.Router();

// Smart pre-check (public)
router.post('/check-email', checkEmailStatus);

// Auth endpoints (public -> set auth cookie)
router.post('/login', loginUser);
router.post('/register', registerUser);

// Session/profile (reads cookie)
router.get('/profile', getProfile);

export default router;
