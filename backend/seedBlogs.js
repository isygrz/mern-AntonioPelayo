import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import connectDB from './config/db.js';
import Blog from './models/Blog.js';
import { logSeed } from './utils/logSeed.js';

const ASSET_BASE = process.env.ASSET_BASE_URL || 'http://localhost:5000';

// Idempotent seed: ensures these posts exist and are updated, without wiping the collection
const demoBlogs = [
  {
    title: 'Behind the Craft',
    slug: 'behind-the-craft',
    content: '<p>A peek behind the artisanal process.</p>',
    image: `${ASSET_BASE}/uploads/default.jpeg`,
    author: 'System',
    published: true,
  },
  {
    title: 'Color Stories: From Quarry to Kiln',
    slug: 'color-stories-quarry-to-kiln',
    content: '<p>How color journeys through production.</p>',
    image: `${ASSET_BASE}/uploads/violet.jpeg`,
    author: 'System',
    published: true,
  },
];

export async function seedBlogs() {
  logSeed('Blogs', 'start');
  try {
    // Upsert each demo blog by slug
    for (const b of demoBlogs) {
      await Blog.findOneAndUpdate(
        { slug: b.slug },
        { $set: b },
        { upsert: true, new: true }
      );
    }

    const count = await Blog.countDocuments();
    logSeed('Blogs', 'success', count);
  } catch (err) {
    logSeed('Blogs', 'error');
    console.error(err);
    throw err;
  }
}

// Standalone CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedBlogs();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}
