import express from 'express';
import {
  createMobileSession,
  getMobileSession, // ✅ make sure this is actually exported
} from '../controllers/mobileSessionController.js';

const router = express.Router();

router.post('/', createMobileSession);
router.get('/:token', getMobileSession);

export default router;
