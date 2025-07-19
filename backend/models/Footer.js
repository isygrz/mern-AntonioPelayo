import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  links: [linkSchema],
});

const footerSchema = new mongoose.Schema(
  {
    sections: [sectionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;
