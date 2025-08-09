// Keep items as filenames or null; controller will normalize to /uploads or fallback
export const cmsSections = [
  {
    type: 'hero',
    enabled: true,
    order: 0,
    config: {
      title: 'Vibrant Designs',
      subtitle: 'Bring bold Mexican flair to your home',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      backgroundImage: 'red.jpeg', // or null to use DB hero/fallback
    },
  },
  {
    type: 'promoGrid',
    enabled: true,
    order: 1,
    config: {
      items: [
        { title: 'New Arrivals', image: 'orange.jpeg', link: '/products' },
        { title: 'Top Rated', image: 'yellow.jpeg', link: '/products' },
        { title: 'Clearance', image: 'green.jpeg', link: '/products' },
      ],
    },
  },
  {
    type: 'featuredProduct',
    enabled: true,
    order: 2,
    config: {
      // Leave empty to trigger controller fallback to top-rated products
      items: [],
    },
  },
  {
    type: 'blogPreview',
    enabled: true,
    order: 3,
    config: {
      // Leave empty to trigger controller fallback to latest published blogs
      items: [],
    },
  },
];
