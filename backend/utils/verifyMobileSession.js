import MobileSession from '../models/MobileSession.js';

export const verifyMobileSession = async (token) => {
  if (!token || typeof token !== 'string' || token.length !== 32) {
    throw new Error('Invalid or missing mobile session token');
  }

  const session = await MobileSession.findOne({ token });

  if (!session) {
    throw new Error('Mobile session not found');
  }

  if (session.expiresAt && session.expiresAt < new Date()) {
    throw new Error('Mobile session expired');
  }

  return session;
};
