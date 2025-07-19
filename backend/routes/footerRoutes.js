import express from 'express';
import { getFooter, updateFooter } from '../controllers/footerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getFooter).put(protect, admin, updateFooter);

export default router;
