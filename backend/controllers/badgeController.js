import Badge from '../models/Badge.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find({});
  res.json(badges);
});

export const createBadge = asyncHandler(async (req, res) => {
  const badge = new Badge({ name: 'New Badge' });
  const created = await badge.save();
  res.status(201).json(created);
});

export const updateBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  if (!badge) throw new Error('Badge not found');

  Object.assign(badge, req.body);
  const updated = await badge.save();
  res.json(updated);
});

export const deleteBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  if (!badge) throw new Error('Badge not found');

  await badge.deleteOne();
  res.json({ message: 'Badge deleted' });
});
