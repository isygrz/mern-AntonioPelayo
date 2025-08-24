import InboxMessage from '../models/InboxMessage.js';
import logger from '../utils/logger.js';

/**
 * Named exports expected by routes:
 * - inboxHealth
 * - submitPublicMessage
 * - submitAccountMessage
 *
 * No external validation libraries required.
 */

// ----------------------
// Helpers (validation)
// ----------------------
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const lenBetween = (v, min, max) => {
  if (typeof v !== 'string') return false;
  const n = v.trim().length;
  return n >= min && n <= max;
};
const isEmail = (v) =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const badRequest = (res, message, errors = []) =>
  res.status(400).json({ message, errors });

// ----------------------
// GET /api/inbox/health
// ----------------------
export const inboxHealth = (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
};

// --------------------------------
// POST /api/inbox/public (no auth)
// --------------------------------
export const submitPublicMessage = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body || {};
    const errors = [];

    if (!isNonEmptyString(name) || !lenBetween(name, 2, 100))
      errors.push({ field: 'name', msg: 'Name must be 2–100 characters' });

    if (!isEmail(email) || !lenBetween(email, 3, 200))
      errors.push({
        field: 'email',
        msg: 'Email must be valid and <= 200 chars',
      });

    if (!isNonEmptyString(message) || !lenBetween(message, 5, 5000))
      errors.push({
        field: 'message',
        msg: 'Message must be 5–5000 characters',
      });

    if (subject != null && !lenBetween(String(subject), 1, 200))
      errors.push({
        field: 'subject',
        msg: 'Subject, if provided, must be 1–200 chars',
      });

    if (errors.length) return badRequest(res, 'Validation failed', errors);

    const doc = await InboxMessage.create({
      subject: (subject || '').toString().trim() || 'Public message',
      message: message.toString().trim(),
      source: 'public',
      meta: {
        name: name.toString().trim(),
        email: email.toString().trim(),
        isGuest: true,
        userAgent: req.get('user-agent') || null,
        ip: req.ip || req.connection?.remoteAddress || null,
      },
    });

    logger.debug('Inbox public created', { id: doc._id });
    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    logger.error('submitPublicMessage failed', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// -------------------------------
// POST /api/inbox (auth required)
// -------------------------------
export const submitAccountMessage = async (req, res) => {
  try {
    const { message, subject } = req.body || {};
    const errors = [];

    if (!isNonEmptyString(message) || !lenBetween(message, 1, 5000))
      errors.push({
        field: 'message',
        msg: 'Message must be 1–5000 characters',
      });

    if (subject != null && !lenBetween(String(subject), 1, 200))
      errors.push({
        field: 'subject',
        msg: 'Subject, if provided, must be 1–200 chars',
      });

    if (errors.length) return badRequest(res, 'Validation failed', errors);

    const user = req.user; // populated by protect middleware

    const doc = await InboxMessage.create({
      fromUser: user?._id || null,
      subject: (subject || '').toString().trim() || 'Account message',
      message: message.toString().trim(),
      source: 'account',
      meta: {
        name: user?.name || null,
        email: user?.email || null,
        isGuest: false,
        userAgent: req.get('user-agent') || null,
        ip: req.ip || req.connection?.remoteAddress || null,
      },
    });

    logger.debug('Inbox account created', { id: doc._id, user: user?._id });
    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    logger.error('submitAccountMessage failed', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
