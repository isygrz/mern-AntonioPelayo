import dotenv from 'dotenv';
import connectDB from './db.js';

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Badge from './models/Badge.js';
import Blog from './models/Blog.js';
import CMS from './models/Cms.model.js';
import Footer from './models/Footer.js';

dotenv.config({ override: true }); // 🧽 Prevents duplicates during reuse
await connectDB();

const flags = new Set(process.argv.slice(2));

const clearAll = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Badge.deleteMany();
    await Blog.deleteMany();
    await CMS.deleteMany();
    await Footer.deleteMany();

    console.log('🧼 All collections cleared');
    process.exit();
  } catch (err) {
    console.error('❌ Clear error:', err.message);
    process.exit(1);
  }
};

const clearSingle = async () => {
  try {
    if (flags.has('--users')) await User.deleteMany();
    if (flags.has('--products')) await Product.deleteMany();
    if (flags.has('--orders')) await Order.deleteMany();
    if (flags.has('--badges')) await Badge.deleteMany();
    if (flags.has('--blogs')) await Blog.deleteMany();
    if (flags.has('--cms')) await CMS.deleteMany();
    if (flags.has('--footer')) await Footer.deleteMany();

    console.log('🧼 Selected collections cleared');
    process.exit();
  } catch (err) {
    console.error('❌ Clear error:', err.message);
    process.exit(1);
  }
};

flags.size === 0 ? clearAll() : clearSingle();
