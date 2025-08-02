import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import connectDB from './config/db.js';
import Blog from './models/Blog.js';
import { logSeed } from './utils/logSeed.js';

const blogs = [
  {
    title: 'Welcome to Our Blog',
    slug: 'welcome-blog',
    content: '<p>This is the first blog post!</p>',
    image: '/uploads/blog1.jpg',
    author: 'Admin',
  },
];

export async function seedBlogs() {
  logSeed('Blogs', 'start');
  try {
    await Blog.deleteMany();
    await Blog.insertMany(blogs);
    logSeed('Blogs', 'success', blogs.length);
  } catch (err) {
    logSeed('Blogs', 'error');
    console.error(err);
    throw err;
  }
}

// Standalone CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedBlogs();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}
