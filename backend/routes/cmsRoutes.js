import express from 'express';
import {
  getCmsByRoute,
  patchCmsLayout,
  cmsHealth,
  // ✅ new: footer endpoint controller
  getFooter,
} from '../controllers/cmsController.js';

// /api/cms/*
const router = express.Router();

// Simple health probe: { ok: true, ts }
router.get('/health', cmsHealth);

// ✅ Footer links/content (served to the public footer, snapshot-cached on the client)
router.get('/footer', getFooter);

// Fetch layout by route (e.g., /?route=/)
router.get('/', getCmsByRoute);

// Patch layout ordering / enable flags
router.patch('/', patchCmsLayout);

export default router;
