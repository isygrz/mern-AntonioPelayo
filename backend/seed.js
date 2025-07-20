import dotenv from 'dotenv';
import connectDB from './db.js';

import seedUsers from './seedUsers.js';
import seedProducts from './seedProducts.js';
import seedOrders from './seedOrders.js';
import seedBadges from './seedBadges.js';
import seedBlogs from './seedBlogs.js';
import seedFooter from './seedFooter.js';
import seedCMS from './seedCms.js';

dotenv.config();
await connectDB();

const flags = new Set(process.argv.slice(2));

const seedAll = async () => {
  try {
    await seedUsers();
    await seedProducts();
    await seedOrders();
    await seedBadges();
    await seedBlogs();
    await seedFooter();
    await seedCMS();

    console.log('✅ All Data Seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

const seedSingle = async () => {
  try {
    if (flags.has('--users')) await seedUsers();
    if (flags.has('--products')) await seedProducts();
    if (flags.has('--orders')) await seedOrders();
    if (flags.has('--badges')) await seedBadges();
    if (flags.has('--blogs')) await seedBlogs();
    if (flags.has('--footer')) await seedFooter();
    if (flags.has('--cms')) await seedCMS();

    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

flags.size === 0 ? seedAll() : seedSingle();
