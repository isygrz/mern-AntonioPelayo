const cmsData = [
  {
    type: 'hero',
    enabled: true,
    order: 1,
    config: {
      title: 'Welcome to Jalisco Tile',
      subtitle: 'Authentic, handcrafted tiles direct to you.',
      backgroundImage: 'http://localhost:5000/uploads/p1.jpeg',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      items: [],
    },
  },
  {
    type: 'promoGrid',
    enabled: true,
    order: 2,
    config: {
      items: [
        {
          title: 'Talavera Classics',
          image: 'http://localhost:5000/uploads/p2.jpeg',
          link: '/collections/talavera',
        },
        {
          title: 'Geometric Lines',
          image: 'http://localhost:5000/uploads/p3.jpeg',
          link: '/collections/geometric',
        },
      ],
    },
  },
  {
    type: 'featuredProduct',
    enabled: true,
    order: 3,
    config: {
      title: 'Our Favorite Picks',
      subtitle: 'Shop curated tiles that our customers love.',
      maxItems: 6,
      items: [], // Filled dynamically in seedCms.js
    },
  },
  {
    type: 'blogPreview',
    enabled: true,
    order: 4,
    config: {
      title: 'From the Studio',
      subtitle: 'Stories, style, and more.',
      showExcerpt: true,
      items: [], // Filled dynamically in seedCms.js
    },
  },
];

export default cmsData;
