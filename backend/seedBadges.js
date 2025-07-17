import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Badge from './models/Badge.js';
import connectDB from './db.js';

dotenv.config();

const badges = [
  {
    name: 'New',
    color: '#10B981',
    description: 'Just added to our collection!',
  },
  {
    name: 'Limited',
    color: '#F59E0B',
    description: 'Limited edition — get it while it lasts.',
  },
  {
    name: 'Sale',
    color: '#EF4444',
    description: 'Discounted — limited-time deal.',
  },
];

const seedBadges = async () => {
  try {
    await connectDB();
    await Badge.deleteMany();
    const created = await Badge.insertMany(badges);
    console.log(`✅ Seeded ${created.length} badges`);
    process.exit();
  } catch (error) {
    console.error(`❌ Badge seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedBadges();
