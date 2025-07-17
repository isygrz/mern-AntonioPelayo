import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['hero', 'promoGrid', 'blogPreview', 'custom'],
    },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    settings: { type: mongoose.Schema.Types.Mixed }, // optional per-section config
  },
  { _id: false }
);

const cmsSchema = new mongoose.Schema(
  {
    route: { type: String, required: true }, // e.g. '/', '/about', etc.
    sections: [sectionSchema],
  },
  { timestamps: true }
);

const CMS = mongoose.model('CMS', cmsSchema);

export default CMS;
