import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { seedUsers } from './seedUsers.js';
import { seedProducts } from './seedProducts.js';
import { seedOrders } from './seedOrders.js';
import { seedBadges } from './seedBadges.js';
import { seedHeroes } from './seedHeroes.js';
import { seedBlogs } from './seedBlogs.js';
import { seedFooter } from './seedFooter.js';
import { seedCms } from './seedCms.js';

try {
  await connectDB();
  await seedUsers();
  await seedProducts();
  await seedOrders();
  await seedBadges();
  await seedHeroes();
  await seedBlogs();
  await seedFooter();
  await seedCms();
  mongoose.disconnect();
} catch (err) {
  console.error('❌ Master seed script failed.');
  process.exit(1);
}
