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
import CMS from './models/Cms.js';
import Footer from './models/Footer.js'; // Optional: only if Footer model exists

// Connect to DB
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
  '--cms',
  '--footers',
  '--all',
];

const clearCollections = async () => {
  try {
    const tasks = [];

    const addTask = (flag, model, name) => {
      if (args.includes(flag) || args.includes('--all')) {
        tasks.push(
          model
            .deleteMany()
            .then(() => console.log(`🧼 Cleared ${name}`.yellow))
        );
      }
    };

    addTask('--badges', Badge, 'Badges');
    addTask('--blogs', Blog, 'Blogs');
    addTask('--heroes', Hero, 'Heroes');
    addTask('--orders', Order, 'Orders');
    addTask('--products', Product, 'Products');
    addTask('--users', User, 'Users');
    addTask('--cms', CMS, 'CMS Layouts');
    addTask('--footers', Footer, 'Footers'); // Skip if you don’t have Footer model

    if (tasks.length === 0) {
      console.log(
        '⚠️  No valid flags provided. Use any of:'.red,
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
