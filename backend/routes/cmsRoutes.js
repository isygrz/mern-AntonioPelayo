import express from 'express';
import {
  getCmsByRoute,
  patchCmsLayout,
  cmsHealth,
} from '../controllers/cmsController.js';

const router = express.Router();

router.get('/health', cmsHealth);
router.get('/', getCmsByRoute);
router.patch('/', patchCmsLayout);

export default router;
