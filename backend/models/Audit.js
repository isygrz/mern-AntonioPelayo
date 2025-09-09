import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: { type: String, required: true }, // e.g., 'user:approve', 'user:reject'
    target: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'targetModel',
      required: true,
    },
    targetModel: { type: String, required: true, enum: ['User'] },
    meta: { type: Object },
    at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Audit = mongoose.model('Audit', auditSchema);
export default Audit;
