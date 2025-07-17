import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from './models/Hero.js';
import connectDB from './db.js';

dotenv.config();

const heroes = [
  {
    heading: 'Summer Ceramic Drop',
    subheading: 'Explore bold colors and hand-fired texture.',
    image: '/uploads/promo-hero1.jpg',
    ctaText: 'Browse New Arrivals',
    ctaLink: '/products',
    active: true,
    placement: 'homepage',
  },
  {
    heading: 'Traditional Meets Modern',
    subheading: 'Handcrafted tiles with a timeless spirit.',
    image: '/uploads/promo-hero2.jpg',
    ctaText: 'Shop Collections',
    ctaLink: '/',
    active: false,
    placement: 'homepage',
  },
];

const seedHeroes = async () => {
  try {
    await connectDB();
    await Hero.deleteMany();
    const created = await Hero.insertMany(heroes);
    console.log(`✅ Seeded ${created.length} heroes`);
    process.exit();
  } catch (error) {
    console.error(`❌ Hero seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedHeroes();
