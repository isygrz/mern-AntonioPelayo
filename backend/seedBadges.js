import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import connectDB from './config/db.js';
import Badge from './models/Badge.js';
import { badges } from './data/badges.js';
import { logSeed } from './utils/logSeed.js';

export async function seedBadges() {
  logSeed('Badges', 'start');
  try {
    await Badge.deleteMany();
    await Badge.insertMany(badges);
    logSeed('Badges', 'success', badges.length);
  } catch (err) {
    logSeed('Badges', 'error');
    console.error(err);
    throw err;
  }
}

// Standalone CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedBadges();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}
