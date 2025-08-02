import mongoose from 'mongoose';
import connectDB from './config/db.js';
import CMS from './models/Cms.model.js';
import { cmsSections } from './data/cms.js';
import { logSeed } from './utils/logSeed.js';

export async function seedCms() {
  logSeed('CMS', 'start');
  try {
    await CMS.deleteMany();
    const created = await CMS.insertMany(cmsSections);
    logSeed('CMS', 'success', created.length);
  } catch (err) {
    logSeed('CMS', 'error');
    console.error(err);
    throw err;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedCms();
    mongoose.disconnect();
  } catch (err) {
    process.exit(1);
  }
}
