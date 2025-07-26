import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      isGuest: user.isGuest,
      accountType: user.accountType,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      approved: user.approved,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const {
    accountType,
    isGuest,
    guestSessionId,
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    emailOptIn,
    companyName,
    tradeProfession,
    password,
  } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser && !isGuest) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const user = await User.create({
    accountType,
    isGuest,
    guestSessionId,
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    emailOptIn,
    companyName,
    tradeProfession,
    password: hashedPassword,
    approved: accountType === 'personal', // Auto-approve personal, require vendor approval
  });

  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    isGuest: user.isGuest,
    accountType: user.accountType,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    approved: user.approved,
  });
});

// ✅ Refactored: Check if email exists
// @route   GET /api/users/check-email
// @access  Public
export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  res.json({
    exists: !!user,
    accountType: user?.accountType || null,
    isApproved: user?.approved || false,
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler((req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      isGuest: user.isGuest,
      accountType: user.accountType,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      approved: user.approved,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Approve vendor user
// @route   PATCH /api/users/:id/approve
// @access  Private/Admin
export const approveVendor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && user.accountType === 'vendor') {
    user.approved = true;
    await user.save();
    res.json({ message: 'Vendor approved' });
  } else {
    res.status(404);
    throw new Error('Vendor not found or invalid type');
  }
});
