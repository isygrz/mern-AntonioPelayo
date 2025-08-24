import express from 'express';
import {
  getFooter,
  updateFooter,
  footerHealth,
} from '../controllers/footerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Optional probe: GET /api/footer/health
router.get('/health', footerHealth);

// GET /api/footer  → returns { links, updatedAt }
router.get('/', getFooter);

// PUT /api/footer (admin-only) → accepts { links } or { sections }
router.put('/', protect, admin, updateFooter);

export default router;
