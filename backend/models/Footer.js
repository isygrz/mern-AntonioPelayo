import mongoose from 'mongoose';

const FooterLinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    url: { type: String, required: true, trim: true },
    external: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const FooterSchema = new mongoose.Schema(
  {
    links: { type: [FooterLinkSchema], default: [] },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Footer || mongoose.model('Footer', FooterSchema);
