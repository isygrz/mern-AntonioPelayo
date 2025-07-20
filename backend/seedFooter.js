import dotenv from 'dotenv';
import connectDB from './db.js';
import Footer from './models/Footer.js';

dotenv.config();

const footerSeed = [
  {
    columns: [
      {
        heading: 'Resources',
        links: [
          { label: 'Blog', url: '/blog' },
          { label: 'Contact', url: '/contact' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About', url: '/about' },
          { label: 'Careers', url: '/careers' },
        ],
      },
    ],
    bottomText: '© 2025 JaliscoTile. All rights reserved.',
  },
];

export default async function seedFooter() {
  try {
    await connectDB();
    await Footer.deleteMany();
    await Footer.insertMany(footerSeed);
    console.log('✅ Footer seeded!');
  } catch (err) {
    console.error('❌ Footer seeding failed:', err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedFooter();
}
