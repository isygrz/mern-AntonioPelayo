import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Auth middleware (refactored)
 * - Accepts JWT from either Cookie "jwt" OR Authorization: Bearer <token>
 * - Keeps existing semantics for admin() and vendor() guards
 * - Emits 401 on missing/invalid token, 403 on role failures
 * - Avoids leaking token/verification details in error bodies
 */

function extractToken(req) {
  // Prefer Authorization header for service/CLI calls
  const auth = req.headers?.authorization || req.headers?.Authorization;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.slice(7).trim();
  }
  // Fallback: signed cookie issued by the app
  const cookieToken = req.cookies?.jwt;
  if (cookieToken) return cookieToken;

  return null;
}

export const protect = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, token missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // The token payload is expected to carry { userId }
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    req.user = user;
    return next();
  } catch (err) {
    // Normalize all errors here to a single 401 to avoid information leaks
    res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 401);
    return next(new Error('Not authorized'));
  }
};

export const admin = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  res.status(403);
  next(new Error('Admin access required'));
};

export const vendor = (req, res, next) => {
  // Keep alignment with model fields: accountType + approved
  if (req.user?.accountType === 'vendor' && req.user?.approved === true) {
    return next();
  }
  res.status(403);
  next(new Error('Vendor access only'));
};
