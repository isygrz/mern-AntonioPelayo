import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Middleware: Requires valid JWT
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      res.status(404);
      throw new Error('User not found');
    }

    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// Middleware: Admin access only
const admin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Admin access required');
  }
};

// Middleware: Approved vendor access only
const vendor = (req, res, next) => {
  if (req.user?.role === 'vendor' && req.user?.isApproved) {
    next();
  } else {
    res.status(403);
    throw new Error('Vendor access only');
  }
};

export { protect, admin, vendor };
