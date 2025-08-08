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
import { printCmsOverview } from './scripts/printCmsOverview.js';

const flags = new Set(process.argv.slice(2));

try {
  await connectDB();

  const runAll = flags.size === 0;

  if (runAll || flags.has('--users')) await seedUsers();
  if (runAll || flags.has('--products')) await seedProducts();
  if (runAll || flags.has('--orders')) await seedOrders();
  if (runAll || flags.has('--badges')) await seedBadges();
  if (runAll || flags.has('--heroes')) await seedHeroes();
  if (runAll || flags.has('--blogs')) await seedBlogs();
  if (runAll || flags.has('--footer')) await seedFooter();
  if (runAll || flags.has('--cms')) await seedCms();

  // 🔎 New: print a CMS overview without re-connecting
  if (flags.has('--cms:overview')) {
    await printCmsOverview();
  }

  await mongoose.disconnect();
} catch (err) {
  console.error('❌ Master seed script failed.');
  console.error(err);
  process.exit(1);
}
