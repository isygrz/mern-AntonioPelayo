import asyncHandler from 'express-async-handler';
import VendorProfile from '../models/VendorProfile.js';

// @desc    Create or update vendor profile
// @route   POST /api/vendor-profile/profile
// @access  Private/Vendor
const saveVendorProfile = asyncHandler(async (req, res) => {
  const {
    businessName,
    website,
    contactEmail,
    contactPhone,
    location,
    bio,
    logoUrl,
    social,
  } = req.body;

  if (!businessName || !contactEmail) {
    res.status(400);
    throw new Error('Business name and contact email are required.');
  }

  const profileFields = {
    user: req.user._id,
    businessName,
    website,
    contactEmail,
    contactPhone,
    location,
    bio,
    logoUrl,
    social,
  };

  let profile = await VendorProfile.findOne({ user: req.user._id });

  if (profile) {
    profile = await VendorProfile.findOneAndUpdate(
      { user: req.user._id },
      profileFields,
      { new: true }
    );
  } else {
    profile = await VendorProfile.create(profileFields);
  }

  res.status(200).json(profile);
});

// @desc    Get logged-in vendor's profile
// @route   GET /api/vendor-profile/profile
// @access  Private/Vendor
const getVendorProfile = asyncHandler(async (req, res) => {
  const profile = await VendorProfile.findOne({ user: req.user._id });

  if (!profile) {
    res.status(404);
    throw new Error('Vendor profile not found.');
  }

  res.json(profile);
});

export { saveVendorProfile, getVendorProfile };
