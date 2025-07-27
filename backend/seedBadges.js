import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import connectDB from './config/db.js';
import Badge from './models/Badge.js';

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

export default async function seedBadges() {
  try {
    await connectDB();
    await Badge.deleteMany();
    await Badge.insertMany(badges);
    console.log(`✅ Seeded ${badges.length} badges`);
  } catch (err) {
    console.error('❌ Badge seeding failed:', err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedBadges();
}
