import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import CMS from '../models/Cms.model.js';
import Blog from '../models/Blog.js';
import Product from '../models/Product.js';
import Hero from '../models/Hero.js';

dotenv.config();

const FALLBACK_IMAGE = 'http://localhost:5000/uploads/default.jpeg';
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const withBaseUrl = (img) => {
  if (!img || typeof img !== 'string' || img.trim() === '')
    return FALLBACK_IMAGE;
  if (img.startsWith('http')) return img;
  if (!img.startsWith('/uploads/')) {
    img = '/uploads/' + img.replace(/^.*[\\\/]/, '');
  }
  return `${BASE_URL}${img}`;
};

export async function printCmsOverview() {
  const shouldSelfConnect = mongoose.connection.readyState !== 1;
  try {
    if (shouldSelfConnect) {
      const uri = process.env.MONGODB_URI || process.env.MONGO_URI || '';
      if (!uri) {
        console.error(
          '❌ No MongoDB URI found. Set MONGODB_URI (or MONGO_URI) in .env'
        );
        return;
      }
      await connectDB();
    }

    const docs = await CMS.find().lean();
    if (!docs.length) {
      console.log('ℹ️  No CMS documents found.');
      return;
    }

    for (const doc of docs) {
      console.log(`\n=== CMS Route: ${doc.route} ===`);

      // filter enabled + sort by order like the API
      const sections = (doc.sections || [])
        .filter((s) => s?.enabled !== false)
        .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

      if (!sections.length) {
        console.log('  (no enabled sections)');
        continue;
      }

      for (const section of sections) {
        const type = section?.type || '(unknown)';
        let config = section?.config || {};

        // --- hydrate to match controller behavior ---
        if (type === 'hero') {
          const hero = await Hero.findOne().lean();
          if (hero) {
            config.title =
              hero.heading || config.title || 'Welcome to Jalisco Tile';
            config.subtitle = hero.subheading || config.subtitle || '';
            config.backgroundImage = withBaseUrl(hero.image);
            config.ctaText = hero.ctaText || config.ctaText || '';
            config.ctaLink = hero.link || config.ctaLink || '/products';
          }
        }

        if (type === 'featuredProduct') {
          const hasItems =
            Array.isArray(config.items) && config.items.length > 0;
          if (!hasItems) {
            const topProducts = await Product.find()
              .sort({ rating: -1 })
              .limit(3)
              .lean();
            config.items = topProducts.map((p) => ({
              title: p.name,
              image: withBaseUrl(p.image),
              link: `/product/${p.slug}`,
            }));
          } else {
            config.items = config.items.map((i) => ({
              ...i,
              image: withBaseUrl(i.image),
            }));
          }
        }

        if (type === 'blogPreview') {
          const hasItems =
            Array.isArray(config.items) && config.items.length > 0;
          if (!hasItems) {
            const blogs = await Blog.find()
              .sort({ createdAt: -1 })
              .limit(3)
              .lean();
            config.items = blogs.map((b) => ({
              title: b.title,
              image: withBaseUrl(b.image),
              link: `/blog/${b.slug}`,
            }));
          } else {
            config.items = config.items.map((i) => ({
              ...i,
              image: withBaseUrl(i.image),
            }));
          }
        }

        if (type === 'promoGrid') {
          if (Array.isArray(config.items)) {
            config.items = config.items.map((i) => ({
              ...i,
              image: withBaseUrl(i.image),
            }));
          }
        }
        // --- end hydration ---

        // Pretty print like the API expectations
        switch (type) {
          case 'hero': {
            const title = config.title || config.heading || '(no title)';
            console.log(`- [hero] title: ${title}`);
            break;
          }
          case 'promoGrid': {
            const first = config.items?.[0]?.title || '';
            const suffix = first ? ` (e.g. "${first}")` : '';
            console.log(
              `- [promoGrid] items: ${config.items?.length ?? 0}${suffix}`
            );
            break;
          }
          case 'featuredProduct': {
            console.log(
              `- [featuredProduct] items: ${config.items?.length ?? 0}`
            );
            break;
          }
          case 'blogPreview': {
            console.log(`- [blogPreview] items: ${config.items?.length ?? 0}`);
            break;
          }
          default: {
            const keys = Object.keys(config || {});
            console.log(
              `- [${type}] config keys: ${keys.join(', ') || '(none)'}`
            );
          }
        }
      }
    }
  } catch (err) {
    console.error('❌ Error fetching CMS data:', err.message);
  } finally {
    if (shouldSelfConnect) {
      try {
        await mongoose.disconnect();
      } catch {}
    }
  }
}

// Standalone: node backend/scripts/printCmsOverview.js
if (import.meta.url === `file://${process.argv[1]}`) {
  printCmsOverview();
}
