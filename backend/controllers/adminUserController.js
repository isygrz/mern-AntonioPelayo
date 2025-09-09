import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Audit from '../models/Audit.js';

/**
 * GET /api/admin/users/pending
 * Returns vendor accounts that are not yet approved.
 */
export const listPending = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(req.query.pageSize || '20', 10))
  );
  const skip = (page - 1) * pageSize;

  const filter = {
    accountType: 'vendor',
    $or: [{ approved: { $eq: false } }, { approved: { $exists: false } }],
  };

  const [items, total] = await Promise.all([
    User.find(filter)
      .select(
        '_id firstName lastName email accountType approved createdAt updatedAt'
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize),
    User.countDocuments(filter),
  ]);

  res.json({ items, total, page, pageSize });
});

/**
 * POST /api/admin/users/:id/approve
 * Marks a user as approved (true).
 */
export const approveUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.approved = true;
  await user.save();

  await Audit.create({
    actor: req.user._id,
    action: 'user:approve',
    target: user._id,
    targetModel: 'User',
    meta: { email: user.email, accountType: user.accountType },
  });

  res.json({ ok: true, user });
});

/**
 * POST /api/admin/users/:id/reject
 * Explicitly marks a user as not approved (false). You can also soft-delete here if desired.
 */
export const rejectUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.approved = false;
  await user.save();

  await Audit.create({
    actor: req.user._id,
    action: 'user:reject',
    target: user._id,
    targetModel: 'User',
    meta: { email: user.email, accountType: user.accountType },
  });

  res.json({ ok: true, user });
});
