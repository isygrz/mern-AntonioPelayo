import express from 'express';
const router = express.Router();
import { saveVendorProfile } from '../controllers/vendorProfileController.js';
import { protect, vendor } from '../middleware/authMiddleware.js';

router.route('/profile').post(protect, vendor, saveVendorProfile);

export default router;
