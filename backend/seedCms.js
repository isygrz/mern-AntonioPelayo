import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import CMS from './models/CMS.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
await connectDB();

const cmsSeed = [
  {
    route: '/',
    sections: [
      { id: uuidv4(), type: 'hero', isActive: true, placement: '/', order: 1 },
      {
        id: uuidv4(),
        type: 'promoGrid',
        isActive: true,
        placement: '/',
        order: 2,
      },
      {
        id: uuidv4(),
        type: 'blogPreview',
        isActive: true,
        placement: '/',
        order: 3,
      },
      {
        id: uuidv4(),
        type: 'testimonial',
        isActive: true,
        placement: '/',
        order: 4,
      },
      {
        id: uuidv4(),
        type: 'newsletterSignup',
        isActive: true,
        placement: '/',
        order: 5,
      },
      {
        id: uuidv4(),
        type: 'ctaBanner',
        isActive: true,
        placement: '/',
        order: 6,
      },
      {
        id: uuidv4(),
        type: 'imageGallery',
        isActive: true,
        placement: '/',
        order: 7,
      },
      {
        id: uuidv4(),
        type: 'quoteBlock',
        isActive: true,
        placement: '/',
        order: 8,
      },
      {
        id: uuidv4(),
        type: 'featureList',
        isActive: true,
        placement: '/',
        order: 9,
      },
      {
        id: uuidv4(),
        type: 'divider',
        isActive: true,
        placement: '/',
        order: 10,
      },
      {
        id: uuidv4(),
        type: 'videoEmbed',
        isActive: true,
        placement: '/',
        order: 11,
      },
      {
        id: uuidv4(),
        type: 'faqAccordion',
        isActive: true,
        placement: '/',
        order: 12,
      },
      {
        id: uuidv4(),
        type: 'eventCountdown',
        isActive: true,
        placement: '/',
        order: 13,
      },
      {
        id: uuidv4(),
        type: 'mapEmbed',
        isActive: true,
        placement: '/',
        order: 14,
      },
      {
        id: uuidv4(),
        type: 'customHTML',
        isActive: true,
        placement: '/',
        order: 15,
      },
      {
        id: uuidv4(),
        type: 'carousel',
        isActive: true,
        placement: '/',
        order: 16,
      },
      {
        id: uuidv4(),
        type: 'collectionShowcase',
        isActive: true,
        placement: '/',
        order: 17,
      },
      {
        id: uuidv4(),
        type: 'productHighlight',
        isActive: true,
        placement: '/',
        order: 18,
      },
      {
        id: uuidv4(),
        type: 'socialEmbed',
        isActive: true,
        placement: '/',
        order: 19,
      },
    ],
  },
];

export default async function seedCMS() {
  try {
    await CMS.deleteMany();
    await CMS.insertMany(cmsSeed);
    console.log('✅ CMS seeded!');
  } catch (err) {
    console.error('❌ CMS seeding failed:', err.message);
  }
}
