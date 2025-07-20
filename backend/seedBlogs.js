import dotenv from 'dotenv';
import connectDB from './db.js';
import Blog from './models/Blog.js';

dotenv.config();

const blogs = [
  {
    title: 'Welcome to Our Blog',
    slug: 'welcome-blog',
    content: '<p>This is the first blog post!</p>',
    image: '/uploads/blog1.jpg',
    author: 'Admin',
  },
];

export default async function seedBlogs() {
  try {
    await connectDB();
    await Blog.deleteMany();
    await Blog.insertMany(blogs);
    console.log(`✅ Seeded ${blogs.length} blogs`);
  } catch (err) {
    console.error('❌ Blog seeding failed:', err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedBlogs();
}
