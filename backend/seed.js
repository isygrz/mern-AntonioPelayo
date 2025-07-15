import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Product from './models/Product.js';
import data from './data.js';

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await Product.deleteMany(); // Clear existing
    await Product.insertMany(data.products); // Seed
    console.log('✅ Seeded products to MongoDB');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
