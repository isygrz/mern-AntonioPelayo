import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Check if user email exists
// @route   POST /api/users/check-email
// @access  Public
const checkEmailStatus = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  const user = await User.findOne({ email });

  if (user) {
    res.json({
      exists: true,
      role: user.role || 'personal',
      isApproved: user.isApproved ?? true,
    });
  } else {
    res.json({ exists: false });
  }
});

export { checkEmailStatus };
