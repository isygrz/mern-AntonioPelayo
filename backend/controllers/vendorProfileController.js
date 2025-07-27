import asyncHandler from 'express-async-handler';
import VendorProfile from '../models/VendorProfile.js';

// @desc    Create or update vendor profile
// @route   POST /api/vendor/profile
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
    // Update existing
    profile = await VendorProfile.findOneAndUpdate(
      { user: req.user._id },
      profileFields,
      {
        new: true,
      }
    );
  } else {
    // Create new
    profile = await VendorProfile.create(profileFields);
  }

  res.status(200).json(profile);
});

export { saveVendorProfile };
