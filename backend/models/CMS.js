import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    headline: { type: String },
    text: { type: String },
    imageUrl: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    quote: { type: String },
    author: { type: String },
    question: { type: String },
    answer: { type: String },
    placeholder: { type: String },
    features: { type: [String] },
    iframeUrl: { type: String },
    videoUrl: { type: String },
    platform: { type: String },
    embedCode: { type: String },
    html: { type: String },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'hero',
        'promoGrid',
        'blogPreview',
        'testimonial',
        'newsletterSignup',
        'ctaBanner',
        'imageGallery',
        'quoteBlock',
        'featureList',
        'divider',
        'videoEmbed',
        'faqAccordion',
        'eventCountdown',
        'mapEmbed',
        'customHTML',
        'carousel',
        'collectionShowcase',
        'productHighlight',
        'socialEmbed',
        'custom', // fallback/custom builder
      ],
    },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    settings: settingsSchema,
  },
  { _id: false }
);

const cmsSchema = new mongoose.Schema(
  {
    route: { type: String, required: true },
    sections: [sectionSchema],
  },
  { timestamps: true }
);

const CMS = mongoose.model('CMS', cmsSchema);

export default CMS;
