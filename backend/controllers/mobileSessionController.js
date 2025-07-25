import crypto from 'crypto';
import MobileSession from '../models/MobileSession.js';
import asyncHandler from '../middleware/asyncHandler.js';

// POST /api/mobile-sessions
export const createMobileSession = asyncHandler(async (req, res) => {
  const token = crypto.randomBytes(16).toString('hex'); // 128-bit secure token
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  const session = await MobileSession.create({
    token,
    createdBy: req.user._id,
    expiresAt,
    deviceInfo: req.headers['user-agent'] || 'unknown',
    sessionType: req.body.sessionType || 'generic', // e.g., 'restock', 'scan'
  });

  // 🧹 Cleanup expired sessions (optional enhancement)
  await MobileSession.deleteMany({ expiresAt: { $lt: new Date() } });

  console.log(
    `🆕 Mobile session created: ${token.slice(0, 8)}... by ${req.user._id}`
  );

  res.status(201).json({ token, expiresAt });
});
