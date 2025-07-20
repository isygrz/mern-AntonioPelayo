import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String },
    links: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Footer = mongoose.models.Footer || mongoose.model('Footer', footerSchema);
export default Footer;
