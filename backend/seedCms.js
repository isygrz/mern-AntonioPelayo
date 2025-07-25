import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cms from './models/Cms.js';
import connectDB from './db.js';
import crypto from 'crypto';

dotenv.config();
connectDB();

const generateSecureId = () => crypto.randomBytes(16).toString('hex');

const seedCms = async () => {
  try {
    await Cms.deleteMany();

    const sections = [
      {
        _id: generateSecureId(),
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
        _id: generateSecureId(),
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
        _id: generateSecureId(),
        type: 'blogPreview',
        order: 2,
        route: '/',
        config: {
          headline: 'From the Studio',
          numPosts: 3,
        },
      },
    ];

    await Cms.insertMany(sections);
    console.log('CMS data seeded!');
    process.exit();
  } catch (error) {
    console.error('Error seeding CMS data:', error);
    process.exit(1);
  }
};

seedCms();
