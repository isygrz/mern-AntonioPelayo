import asyncHandler from 'express-async-handler';
import { verifyMobileSession } from '../utils/verifyMobileSession.js';

const verifyMobileSessionMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers['x-mobile-session-token'] || req.query.token;

  if (!token) {
    res.status(401);
    throw new Error('Mobile session token required');
  }

  const session = await verifyMobileSession(token);

  if (!session) {
    res.status(401);
    throw new Error('Invalid or expired mobile session token');
  }

  // Optional: verbose logging in dev
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Mobile session validated:', session.token);
  }

  req.mobileSession = session; // Attach for downstream use
  next();
});

export default verifyMobileSessionMiddleware;
