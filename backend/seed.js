import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';

import Product from './models/Product.js';
import Badge from './models/Badge.js';
import Hero from './models/Hero.js';
import Blog from './models/Blog.js';
import User from './models/User.js';
import CMS from './models/CMS.js';

import data from './data.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const badgeSeed = [
  {
    name: 'New',
    color: '#10B981',
    description: 'Just added to our collection!',
  },
  {
    name: 'Limited',
    color: '#F59E0B',
    description: 'Limited edition — get it while it lasts.',
  },
  {
    name: 'Sale',
    color: '#EF4444',
    description: 'Discounted — limited-time deal.',
  },
];

const heroSeed = [
  {
    heading: 'Summer Ceramic Drop',
    subheading: 'Explore bold colors and hand-fired texture.',
    image: '/uploads/promo-hero1.jpg',
    ctaText: 'Browse New Arrivals',
    ctaLink: '/products',
    active: true,
  },
  {
    heading: 'Traditional Meets Modern',
    subheading: 'Handcrafted tiles with a timeless spirit.',
    image: '/uploads/promo-hero2.jpg',
    ctaText: 'Shop Collections',
    ctaLink: '/',
    active: false,
  },
];

const blogSeed = [
  {
    title: 'Behind the Brush: Antonio’s Process',
    slug: 'behind-the-brush',
    image: '/uploads/hero1.jpg',
    content: 'Explore the layered storytelling in each brushstroke...',
    author: 'Antonio Pelayo',
    published: true,
  },
  {
    title: 'Traditions in Color',
    slug: 'traditions-in-color',
    image: '/uploads/hero2.jpg',
    content: 'A visual journey through Mexican culture...',
    author: 'Antonio Pelayo',
    published: true,
  },
];

const userSeed = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    name: 'Normal User',
    email: 'user@example.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
  },
];

const cmsSeed = [
  {
    route: '/',
    sections: [
      { type: 'hero', enabled: true },
      { type: 'promoGrid', enabled: true },
      { type: 'blogPreview', enabled: true },
    ],
  },
];

const seed = async () => {
  try {
    const args = process.argv.slice(2);
    const seedAll = args.includes('--all') || args.length === 0;

    if (seedAll || args.includes('--products')) {
      await Product.deleteMany();
      await Product.insertMany(data.products);
      console.log('✅ Seeded Products');
    }

    if (seedAll || args.includes('--badges')) {
      await Badge.deleteMany();
      await Badge.insertMany(badgeSeed);
      console.log('✅ Seeded Badges');
    }

    if (seedAll || args.includes('--heroes')) {
      await Hero.deleteMany();
      await Hero.insertMany(heroSeed);
      console.log('✅ Seeded Heroes');
    }

    if (seedAll || args.includes('--blogs')) {
      await Blog.deleteMany();
      await Blog.insertMany(blogSeed);
      console.log('✅ Seeded Blogs');
    }

    if (seedAll || args.includes('--users')) {
      await User.deleteMany();
      await User.insertMany(userSeed);
      console.log('✅ Seeded Users');
    }

    if (seedAll || args.includes('--cms')) {
      await CMS.deleteMany();
      await CMS.insertMany(cmsSeed);
      console.log('✅ Seeded CMS sections');
    }

    console.log('🎉 Seeding complete!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
