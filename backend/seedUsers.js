// backend/seedUsers.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './db.js';
import User from './models/User.js';

dotenv.config();
await connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'Guest User',
    email: 'guest@example.com',
    password: bcrypt.hashSync('guest123', 10),
    isAdmin: false,
  },
];

try {
  await User.deleteMany();
  const inserted = await User.insertMany(users);
  console.log(`✅ Seeded ${inserted.length} users`);
  process.exit(0);
} catch (error) {
  console.error('❌ User seeding failed:', error);
  process.exit(1);
}
