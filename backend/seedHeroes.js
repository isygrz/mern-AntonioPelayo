import dotenv from 'dotenv';
import connectDB from './db.js';
import Hero from './models/Hero.js';

dotenv.config();

const heroSeed = [
  {
    heading: 'Timeless Design, Handmade in Jalisco',
    subheading: 'Explore our artisan tiles and bring heritage to your home.',
    image: '/uploads/hero-1.jpg',
    ctaText: 'Shop Now',
    ctaUrl: '/shop',
  },
];

export default async function seedHeroes() {
  try {
    await connectDB();
    await Hero.deleteMany();
    await Hero.insertMany(heroSeed);
    console.log('✅ Hero section seeded!');
  } catch (err) {
    console.error('❌ Hero seeding failed:', err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedHeroes();
}
