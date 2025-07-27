import express from 'express';
const router = express.Router();

import {
  saveVendorProfile,
  getVendorProfile,
} from '../controllers/vendorProfileController.js';

import { protect, vendor } from '../middleware/authMiddleware.js';

router
  .route('/profile')
  .get(protect, vendor, getVendorProfile)
  .post(protect, vendor, saveVendorProfile);

export default router;
