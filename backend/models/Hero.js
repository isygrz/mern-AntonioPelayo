import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String },
    image: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Hero = mongoose.model('Hero', heroSchema);
export default Hero;
