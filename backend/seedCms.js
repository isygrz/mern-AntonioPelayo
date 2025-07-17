import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../db.js';
import CMS from '../models/CMS.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
connectDB();

const cmsSeed = [
  {
    route: '/',
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        isActive: true,
        placement: '/',
        order: 1,
      },
      {
        id: uuidv4(),
        type: 'promogrid',
        isActive: true,
        placement: '/',
        order: 2,
      },
      {
        id: uuidv4(),
        type: 'blogpreview',
        isActive: true,
        placement: '/',
        order: 3,
      },
    ],
  },
];

const seedCMS = async () => {
  try {
    await CMS.deleteMany();
    await CMS.insertMany(cmsSeed);
    console.log('✅ Seeded CMS Sections');
    process.exit();
  } catch (err) {
    console.error('❌ CMS Seeding Failed:', err.message);
    process.exit(1);
  }
};

seedCMS();
