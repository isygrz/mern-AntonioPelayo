const cmsFieldConfig = {
  hero: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'text', label: 'Subtitle', type: 'textarea' },
    { key: 'imageUrl', label: 'Background Image', type: 'image' },
    { key: 'buttonText', label: 'CTA Text', type: 'text' },
    { key: 'buttonLink', label: 'CTA Link', type: 'text' },
  ],
  promoGrid: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'text', label: 'Description', type: 'textarea' },
    { key: 'imageUrl', label: 'Background Image', type: 'image' },
  ],
  blogPreview: [{ key: 'headline', label: 'Headline', type: 'text' }],
  testimonial: [
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'author', label: 'Author', type: 'text' },
  ],
  newsletterSignup: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'placeholder', label: 'Email Placeholder', type: 'text' },
  ],
  ctaBanner: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'buttonText', label: 'CTA Text', type: 'text' },
    { key: 'buttonLink', label: 'CTA Link', type: 'text' },
    { key: 'imageUrl', label: 'Background Image', type: 'image' },
  ],
  imageGallery: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'imageUrl', label: 'Image URL', type: 'image' },
  ],
  quoteBlock: [
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'author', label: 'Author', type: 'text' },
  ],
  featureList: [
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'features', label: 'Features', type: 'textarea' },
  ],
  divider: [],
  videoEmbed: [{ key: 'videoUrl', label: 'YouTube/Embed URL', type: 'text' }],
  faqAccordion: [
    { key: 'question', label: 'Question', type: 'text' },
    { key: 'answer', label: 'Answer', type: 'textarea' },
  ],
  eventCountdown: [{ key: 'headline', label: 'Headline', type: 'text' }],
  mapEmbed: [{ key: 'iframeUrl', label: 'Map Iframe URL', type: 'text' }],
  customHTML: [{ key: 'html', label: 'Custom HTML', type: 'textarea' }],
  carousel: [{ key: 'headline', label: 'Headline', type: 'text' }],
  collectionShowcase: [{ key: 'headline', label: 'Headline', type: 'text' }],
  productHighlight: [{ key: 'headline', label: 'Headline', type: 'text' }],
  socialEmbed: [
    { key: 'platform', label: 'Platform', type: 'text' },
    { key: 'embedCode', label: 'Embed Code', type: 'textarea' },
  ],
};

export default cmsFieldConfig;
