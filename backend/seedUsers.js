import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './db.js';
import User from './models/User.js';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Regular User',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default async function seedUsers() {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log(`✅ Seeded ${users.length} users`);
  } catch (err) {
    console.error('❌ User seeding failed:', err.message);
    process.exit(1);
  }
}

// ✅ Only run if this script is executed directly via CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await connectDB();
    await seedUsers();
    process.exit();
  })();
}
