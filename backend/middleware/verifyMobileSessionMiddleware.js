import asyncHandler from 'express-async-handler';
import { verifyMobileSession } from '../utils/verifyMobileSession.js';

/**
 * verifyMobileSessionMiddleware
 * - Accepts token via header `x-mobile-session-token` OR query `?token=`
 * - Validates basic format (32-byte hex => 64 chars)
 * - Verifies token via utility
 * - Rejects expired sessions
 * - Attaches `req.mobileSession` and (optionally) `req.user` if not present
 */
const HEX64 = /^[a-f0-9]{64}$/i;

const verifyMobileSessionMiddleware = asyncHandler(async (req, res, next) => {
  // 1) Read token from header or query
  const headerToken = req.headers['x-mobile-session-token'];
  const queryToken = req.query?.token;
  const token = (headerToken || queryToken || '').toString().trim();

  if (!token) {
    res.status(401);
    throw new Error('Mobile session token required');
  }

  // 2) Basic format guard: 32-byte hex (64 chars)
  if (!HEX64.test(token)) {
    res.status(400);
    throw new Error('Invalid mobile session token format');
  }

  // 3) Verify the session via utility
  const session = await verifyMobileSession(token);
  if (!session) {
    res.status(401);
    throw new Error('Invalid or expired mobile session token');
  }

  // 4) Expiry guard (if utility didn't already enforce it)
  if (
    session.expiresAt &&
    new Date(session.expiresAt).getTime() <= Date.now()
  ) {
    res.status(401);
    throw new Error('Mobile session expired');
  }

  // 5) Attach for downstream use
  req.mobileSession = session;
  if (!req.user && session.user) {
    // expose user context for mobile session–guarded reads only
    req.user = session.user;
  }

  if (
    process.env.DEBUG_MOBILE_SESSION === 'true' &&
    process.env.NODE_ENV !== 'production'
  ) {
    console.log('✅ Mobile session validated:', token.slice(0, 8) + '…');
  }

  next();
});

export default verifyMobileSessionMiddleware;
