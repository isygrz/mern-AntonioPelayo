import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import { products } from './data/products.js';
import { logSeed } from './utils/logSeed.js';

export async function seedProducts() {
  logSeed('Products', 'start');
  try {
    await Product.deleteMany();
    const created = await Product.insertMany(products);
    logSeed('Products', 'success', created.length);
  } catch (err) {
    logSeed('Products', 'error');
    console.error(err);
    throw err;
  }
}

// Allow standalone CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedProducts();
    mongoose.disconnect();
  } catch (err) {
    process.exit(1);
  }
}
