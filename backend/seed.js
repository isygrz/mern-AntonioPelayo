import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Badge from './models/Badge.js';
import Blog from './models/Blog.js';
import CMS from './models/CMS.js';
import Footer from './models/Footer.js';

import users from './seedUsers.js';
import productData from './seedProducts.js';
import badges from './seedBadges.js';
import blogs from './seedBlogs.js';
import footerData from './seedFooter.js';
import seedCMS from './seedCms.js';

dotenv.config();
await connectDB();

const flags = new Set(process.argv.slice(2));
const { products } = productData;

const seedAll = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Badge.deleteMany();
    await Blog.deleteMany();
    await CMS.deleteMany();
    await Footer.deleteMany();

    await User.insertMany(users);
    await Product.insertMany(products);
    await Badge.insertMany(badges);
    await Blog.insertMany(blogs);
    await Footer.insertMany(footerData);

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
    if (flags.has('--users')) {
      await User.deleteMany();
      await User.insertMany(users);
      console.log('✅ Seeded Users');
    }

    if (flags.has('--products')) {
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log('✅ Seeded Products');
    }

    if (flags.has('--orders')) {
      await Order.deleteMany();
      console.log('✅ Cleared Orders');
    }

    if (flags.has('--badges')) {
      await Badge.deleteMany();
      await Badge.insertMany(badges);
      console.log('✅ Seeded Badges');
    }

    if (flags.has('--blogs')) {
      await Blog.deleteMany();
      await Blog.insertMany(blogs);
      console.log('✅ Seeded Blogs');
    }

    if (flags.has('--cms')) {
      await CMS.deleteMany();
      await seedCMS();
      console.log('✅ Seeded CMS');
    }

    if (flags.has('--footer')) {
      await Footer.deleteMany();
      await Footer.insertMany(footerData);
      console.log('✅ Seeded Footer');
    }

    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

flags.size === 0 ? seedAll() : seedSingle();
