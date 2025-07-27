import express from 'express';
const router = express.Router();

import {
  checkEmailStatus,
  // (Add registerUser, loginUser, etc. when needed)
} from '../controllers/userController.js';

router.post('/check-email', checkEmailStatus); // ✅ Route for smart auth flow

export default router;
