import express from 'express';
import {
  submitPublicMessage,
  submitAccountMessage,
  inboxHealth,
} from '../controllers/inboxController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/health', inboxHealth);
router.post('/public', submitPublicMessage);
router.post('/', protect, submitAccountMessage);

export default router;
