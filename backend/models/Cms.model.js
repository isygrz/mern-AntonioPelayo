import mongoose from 'mongoose';

const configSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    title: String,
    subtitle: String,
    backgroundImage: String,
    ctaText: String,
    ctaLink: String,
    items: [
      {
        title: String,
        image: String,
        link: String,
      },
    ],
    maxItems: Number,
    showExcerpt: Boolean,
    html: String,
    embedCode: String,
    // Add more keys as needed
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
        'featuredProduct',
        'custom',
      ],
    },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    config: configSchema, // ✅ match frontend logic
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

// ✅ Prevent OverwriteModelError in dev
const CMS = mongoose.models.CMS || mongoose.model('CMS', cmsSchema);

export default CMS;
