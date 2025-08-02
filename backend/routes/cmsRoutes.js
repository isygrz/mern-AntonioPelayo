import express from 'express';
import {
  getCmsByRoute,
  updateCmsLayout,
} from '../controllers/cmsController.js';

const router = express.Router();

// @desc    Get CMS config by route (e.g., '/', '/about')
// @route   GET /api/cms?route=/
// @access  Public
router.get('/', getCmsByRoute);

// @desc    Update CMS layout (sections) for a route
// @route   PATCH /api/cms
// @access  Admin
router.patch('/', updateCmsLayout);

export default router;
