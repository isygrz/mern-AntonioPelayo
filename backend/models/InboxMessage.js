import mongoose from 'mongoose';

const inboxMessageSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // allow guest submissions
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    replied: { type: Boolean, default: false },
    source: {
      type: String,
      enum: ['form', 'whatsapp', 'matrix', 'public', 'account'],
      default: 'form',
    },
    meta: {
      name: { type: String },
      email: { type: String },
      isGuest: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const InboxMessage =
  mongoose.models.InboxMessage ||
  mongoose.model('InboxMessage', inboxMessageSchema);
export default InboxMessage;
