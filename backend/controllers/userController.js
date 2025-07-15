import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user (personal or pro or guest)
// @route   POST /api/users/register
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
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      isGuest: false,
      accountType: user.accountType,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
