import asyncHandler from '../middleware/asyncHandler.js';
import InboxMessage from '../models/InboxMessage.js';

export const createMessage = asyncHandler(async (req, res) => {
  const { subject, message, source = 'form' } = req.body;

  const inbox = await InboxMessage.create({
    fromUser: req.user._id,
    subject,
    message,
    source,
  });

  res.status(201).json(inbox);
});

export const getInbox = asyncHandler(async (req, res) => {
  const messages = await InboxMessage.find().populate(
    'fromUser',
    'email accountType'
  );
  res.json(messages);
});
