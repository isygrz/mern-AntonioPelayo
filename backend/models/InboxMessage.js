import mongoose from 'mongoose';

const inboxMessageSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    replied: { type: Boolean, default: false },
    source: {
      type: String,
      enum: ['form', 'whatsapp', 'matrix'],
      default: 'form',
    },
  },
  { timestamps: true }
);

const InboxMessage = mongoose.model('InboxMessage', inboxMessageSchema);
export default InboxMessage;
