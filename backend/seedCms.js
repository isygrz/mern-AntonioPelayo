import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Cms from './models/Cms.model.js';
import { cmsSections } from './data/cms.js';

import { heroes } from './data/heroes.js';
import { blogs } from './data/blogs.js';
import { products } from './data/products.js';

import { logSeed } from './utils/logSeed.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const route = '/';

const sanitizeConfig = (type, rawConfig = {}) => {
  switch (type) {
    case 'hero': {
      const hero = heroes[0] || {};
      return {
        title: hero.title || '',
        subtitle: hero.subtitle || '',
        backgroundImage: hero.backgroundImage || '',
        ctaText: hero.ctaText || '',
        ctaLink: hero.ctaLink || '',
      };
    }

    case 'blogPreview': {
      return {
        items: blogs.slice(0, 3).map((blog) => ({
          title: blog.title || '',
          image: blog.image || '',
          link: `/blog/${blog.slug || blog._id || ''}`,
        })),
      };
    }

    case 'featuredProduct': {
      return {
        items: products.slice(0, 6).map((product) => ({
          title: product.name || '',
          image: product.image || '',
          link: `/product/${product.slug || product._id || ''}`,
        })),
      };
    }

    case 'promoGrid': {
      return {
        items: [
          {
            title: 'New Arrivals',
            image: 'http://localhost:5000/uploads/orange.jpeg',
            link: '/category/new',
          },
          {
            title: 'Top Rated',
            image: 'http://localhost:5000/uploads/yellow.jpeg',
            link: '/category/top',
          },
          {
            title: 'Clearance',
            image: 'http://localhost:5000/uploads/green.jpeg',
            link: '/category/clearance',
          },
        ],
      };
    }

    default:
      return rawConfig || {};
  }
};

export const seedCms = async () => {
  try {
    logSeed('CMS', 'Starting CMS seeding...', 'start');
    await Cms.deleteMany({ route });

    const populatedSections = cmsSections.map((section, index) => {
      const { type, enabled = true, config = {} } = section;
      const sanitizedConfig = sanitizeConfig(type, config);

      let referenceId = null;

      if (type === 'hero' && heroes.length > 0) {
        referenceId = heroes[0]._id;
      } else if (type === 'blogPreview' && blogs.length > 0) {
        referenceId = blogs[0]._id;
      } else if (type === 'featuredProduct' && products.length > 0) {
        referenceId = products[0]._id;
      }

      return {
        type,
        enabled,
        order: index,
        config: sanitizedConfig,
        referenceId,
      };
    });

    await Cms.create({ route, sections: populatedSections });

    logSeed(
      'CMS',
      `✅ Successfully seeded ${populatedSections.length} sections to '${route}' route.`,
      'success'
    );
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding CMS: ${error.message}`);
    process.exit(1);
  }
};

// ✅ Allows running directly (node seedCms.js)
if (process.argv[1].includes('seedCms.js')) {
  seedCms();
}
