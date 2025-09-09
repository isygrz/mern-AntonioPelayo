// GET /api/footer and PUT /api/footer (admin)
// Mount with: app.use('/api', footerRoutes)

import express from 'express';
import { getFooter, updateFooter } from '../controllers/footerController.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.get('/footer', getFooter);
router.put('/footer', requireRole('admin'), updateFooter);

export default router;
