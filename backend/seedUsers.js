import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import { users } from './data/users.js';
import { logSeed } from './utils/logSeed.js';

export async function seedUsers() {
  logSeed('Users', 'start');
  try {
    await User.deleteMany();
    const created = await User.insertMany(users);
    logSeed('Users', 'success', created.length);
  } catch (err) {
    logSeed('Users', 'error');
    console.error(err);
    throw err;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedUsers();
    mongoose.disconnect();
  } catch (err) {
    process.exit(1);
  }
}
