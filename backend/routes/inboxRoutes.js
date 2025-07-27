import express from 'express';
import { createMessage, getInbox } from '../controllers/inboxController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createMessage).get(protect, admin, getInbox);

export default router;
