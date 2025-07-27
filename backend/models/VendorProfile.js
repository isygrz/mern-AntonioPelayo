import mongoose from 'mongoose';

const vendorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One profile per vendor
    },
    businessName: { type: String, required: true },
    website: { type: String },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    location: { type: String },
    bio: { type: String },
    logoUrl: { type: String },
    social: {
      facebook: { type: String },
      instagram: { type: String },
      tiktok: { type: String },
      whatsapp: { type: String },
      telegram: { type: String },
    },
    approvedByAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const VendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);
export default VendorProfile;
