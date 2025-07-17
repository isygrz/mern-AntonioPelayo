import express from 'express';
import {
  getBadges,
  createBadge,
  updateBadge,
  deleteBadge,
} from '../controllers/badgeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBadges).post(protect, admin, createBadge);
router
  .route('/:id')
  .put(protect, admin, updateBadge)
  .delete(protect, admin, deleteBadge);

export default router;
