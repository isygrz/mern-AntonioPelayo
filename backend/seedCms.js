import crypto from 'crypto';

export const seedCmsData = {
  sections: [
    {
      _id: crypto.randomBytes(16).toString('hex'),
      type: 'hero',
      order: 0,
      route: '/',
      config: {
        headline: 'Antonio Pelayo Studio',
        subtext: 'From Canvas to Cultura',
        image: '/uploads/hero1.jpg',
        ctaText: 'Explore the Collection',
        ctaLink: '/products',
      },
    },
    {
      _id: crypto.randomBytes(16).toString('hex'),
      type: 'promoGrid',
      order: 1,
      route: '/',
      config: {
        tiles: [
          {
            title: 'Fine Art Prints',
            image: '/uploads/print1.jpg',
            link: '/products?category=prints',
          },
          {
            title: 'Limited Edition',
            image: '/uploads/limited.jpg',
            link: '/products?tag=limited',
          },
        ],
      },
    },
    {
      _id: crypto.randomBytes(16).toString('hex'),
      type: 'blogPreview',
      order: 2,
      route: '/',
      config: {
        headline: 'From the Studio',
        numPosts: 3,
      },
    },
  ],
};
