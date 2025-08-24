import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ['personal', 'vendor'],
      required: true,
      default: 'personal',
    },
    approved: {
      type: Boolean,
      default: function () {
        return this.accountType === 'personal';
      },
    },

    isGuest: { type: Boolean, default: false },
    guestSessionId: { type: String },

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    emailOptIn: { type: Boolean, default: false },

    companyName: { type: String },
    tradeProfession: {
      type: String,
      enum: [
        'Architect',
        'Builder-Remodeler',
        'Contractor-Installer',
        'Interior Designer',
        'Other',
      ],
    },

    password: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Compatibility virtuals: expose role/isApproved for older code paths
userSchema.virtual('role').get(function role() {
  return this.accountType;
});
userSchema.virtual('isApproved').get(function isApproved() {
  return this.approved === true;
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
