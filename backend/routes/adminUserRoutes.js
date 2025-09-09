import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/requireRole.js';
import {
  listPending,
  approveUser,
  rejectUser,
} from '../controllers/adminUserController.js';

const router = express.Router();

const methodNotAllowed = (allowed) => (req, res) => {
  res.set('Allow', allowed.join(', '));
  return res
    .status(405)
    .json({ message: 'Method Not Allowed', path: req.path, allowed });
};

router.get('/users/pending', protect, requireRole('admin'), listPending);
router.all('/users/pending', methodNotAllowed(['GET']));

router.post('/users/:id/approve', protect, requireRole('admin'), approveUser);
router.all('/users/:id/approve', methodNotAllowed(['POST']));

router.post('/users/:id/reject', protect, requireRole('admin'), rejectUser);
router.all('/users/:id/reject', methodNotAllowed(['POST']));

export default router;
