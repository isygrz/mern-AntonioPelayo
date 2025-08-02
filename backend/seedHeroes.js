import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Hero from './models/Hero.js';
import { heroes } from './data/heroes.js';
import { logSeed } from './utils/logSeed.js';

export async function seedHeroes() {
  logSeed('Heroes', 'start');
  try {
    await Hero.deleteMany();
    const created = await Hero.insertMany(heroes);
    logSeed('Heroes', 'success', created.length);
  } catch (err) {
    logSeed('Heroes', 'error');
    console.error(err);
    throw err;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedHeroes();
    mongoose.disconnect();
  } catch (err) {
    process.exit(1);
  }
}
