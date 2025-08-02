import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Footer from './models/Footer.js';
import { footerData } from './data/footer.js';
import { logSeed } from './utils/logSeed.js';

export async function seedFooter() {
  logSeed('Footer', 'start');
  try {
    await Footer.deleteMany();
    const created = await Footer.insertMany(footerData);
    logSeed('Footer', 'success', created.length);
  } catch (err) {
    logSeed('Footer', 'error');
    console.error(err);
    throw err;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedFooter();
    mongoose.disconnect();
  } catch (err) {
    process.exit(1);
  }
}
