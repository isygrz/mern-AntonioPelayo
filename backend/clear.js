import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// Load models
import Badge from './models/Badge.js';
import Blog from './models/Blog.js';
import Hero from './models/Hero.js';
import Order from './models/Order.js';
import Product from './models/Product.js';
import User from './models/User.js';

// DB connect
import connectDB from './db.js';

dotenv.config();
await connectDB();

const args = process.argv.slice(2);
const validFlags = [
  '--badges',
  '--blogs',
  '--heroes',
  '--orders',
  '--products',
  '--users',
];

const clearCollections = async () => {
  try {
    const tasks = [];

    if (args.includes('--badges')) {
      tasks.push(
        Badge.deleteMany().then(() => console.log('🧼 Cleared Badges'.yellow))
      );
    }
    if (args.includes('--blogs')) {
      tasks.push(
        Blog.deleteMany().then(() => console.log('🧼 Cleared Blogs'.yellow))
      );
    }
    if (args.includes('--heroes')) {
      tasks.push(
        Hero.deleteMany().then(() => console.log('🧼 Cleared Heroes'.yellow))
      );
    }
    if (args.includes('--orders')) {
      tasks.push(
        Order.deleteMany().then(() => console.log('🧼 Cleared Orders'.yellow))
      );
    }
    if (args.includes('--products')) {
      tasks.push(
        Product.deleteMany().then(() =>
          console.log('🧼 Cleared Products'.yellow)
        )
      );
    }
    if (args.includes('--users')) {
      tasks.push(
        User.deleteMany().then(() => console.log('🧼 Cleared Users'.yellow))
      );
    }

    if (tasks.length === 0) {
      console.log(
        '⚠️  No valid flags provided. Use any of:',
        validFlags.join(', ').cyan
      );
      process.exit();
    }

    await Promise.all(tasks);
    console.log('✅ Selected collections cleared successfully'.green);
    process.exit();
  } catch (error) {
    console.error(`❌ Error clearing collections: ${error.message}`.red);
    process.exit(1);
  }
};

clearCollections();
