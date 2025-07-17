import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Blog from './models/Blog.js';

dotenv.config();
await connectDB();

const sampleBlogs = [
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

try {
  await Blog.deleteMany();
  const inserted = await Blog.insertMany(sampleBlogs);
  console.log(`✅ Seeded ${inserted.length} blog posts`);
  process.exit(0);
} catch (error) {
  console.error('❌ Blog seeding failed:', error);
  process.exit(1);
}
