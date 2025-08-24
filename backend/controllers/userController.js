import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const computeRole = (user) =>
  user?.isAdmin ? 'admin' : user?.accountType || 'personal';

const shapeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: !!user.isAdmin,
  accountType: user.accountType || 'personal',
  approved: typeof user.approved === 'boolean' ? user.approved : true,
  isApproved: typeof user.approved === 'boolean' ? user.approved : true, // compatibility
  role: computeRole(user),
  permissions: user.isAdmin ? ['admin:all'] : [],
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const setAuthCookie = (res, userId) => {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const token = jwt.sign({ userId }, secret, { expiresIn: '30d' });
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const checkEmailStatus = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    res.status(400);
    throw new Error('Invalid email format');
  }
  const user = await User.findOne({ email });
  if (user) {
    const approved = !!user.approved;
    return res.json({
      exists: true,
      role: computeRole(user),
      approved,
      isApproved: approved, // compatibility with client code
    });
  }
  return res.json({ exists: false });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const stored = user.password || '';
  const looksHashed = /^\$2[aby]\$/.test(stored);
  const ok = looksHashed
    ? await bcrypt.compare(password, stored)
    : password === stored;

  if (!ok) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  setAuthCookie(res, user._id);
  return res.json(shapeUser(user));
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, accountType } = req.body || {};
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const hashed = await bcrypt.hash(password, 10);
  const doc = await User.create({
    name,
    email,
    password: hashed,
    accountType: accountType || 'personal',
  });
  setAuthCookie(res, doc._id);
  return res.status(201).json(shapeUser(doc));
});

export const getProfile = asyncHandler(async (req, res) => {
  const token = req.cookies?.jwt;
  let userId = null;

  if (token) {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || 'dev_secret_change_me'
      );
      userId = payload?.userId;
    } catch (e) {
      // ignore
    }
  }

  let user = null;
  if (userId) {
    user = await User.findById(userId);
  } else if (req.query?.email) {
    user = await User.findOne({ email: req.query.email });
  }

  if (!user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  return res.json(shapeUser(user));
});
