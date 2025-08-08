import asyncHandler from '../middleware/asyncHandler.js';
import CMS from '../models/Cms.model.js';
import Blog from '../models/Blog.js';
import Product from '../models/Product.js';
import Hero from '../models/Hero.js';

const FALLBACK_IMAGE = 'http://localhost:5000/uploads/default.jpeg';
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const withBaseUrl = (img) => {
  if (!img || typeof img !== 'string' || img.trim() === '') {
    return FALLBACK_IMAGE;
  }
  if (img.startsWith('http')) return img;
  if (!img.startsWith('/uploads/')) {
    img = '/uploads/' + img.replace(/^.*[\\/]/, '');
  }
  return `${BASE_URL}${img}`;
};

// GET /api/cms?route=/
const getCmsByRoute = asyncHandler(async (req, res) => {
  const route = req.query.route || '/';
  const cms = await CMS.findOne({ route });

  if (!cms || !Array.isArray(cms.sections) || cms.sections.length === 0) {
    console.log(`[cms] No CMS sections found for route: ${route}`);
    return res.json({ sections: [] });
  }

  const filteredSections = cms.sections
    .filter((section) => section.enabled !== false)
    .sort((a, b) => a.order - b.order);

  const hydratedSections = await Promise.all(
    filteredSections.map(async (section) => {
      let config = section.config || {};
      const type = section.type;

      if (type === 'hero') {
        const hero = await Hero.findOne();
        if (hero) {
          config.title = hero.heading || 'Welcome to Jalisco Tile';
          config.subtitle =
            hero.subheading || 'Experience artisan tile with cultural depth.';
          config.backgroundImage = withBaseUrl(hero.image);
          config.ctaText = hero.ctaText || 'Shop Now';
          config.ctaLink = hero.link || '/products';
          console.log(`[cms] Hero image: ${config.backgroundImage}`);
        } else {
          config.backgroundImage = FALLBACK_IMAGE;
        }
      }

      if (type === 'featuredProduct') {
        const hasItems = Array.isArray(config.items) && config.items.length > 0;
        if (!hasItems) {
          const topProducts = await Product.find()
            .sort({ rating: -1 })
            .limit(3);
          config.items = topProducts.map((p) => ({
            title: p.name,
            image: withBaseUrl(p.image),
            link: `/product/${p.slug}`,
          }));
        } else {
          config.items = config.items.map((item) => ({
            ...item,
            image: withBaseUrl(item.image),
          }));
        }
      }

      if (type === 'blogPreview') {
        const hasItems = Array.isArray(config.items) && config.items.length > 0;
        if (!hasItems) {
          const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
          config.items = blogs.map((b) => ({
            title: b.title,
            image: withBaseUrl(b.image),
            link: `/blog/${b.slug}`,
          }));
        } else {
          config.items = config.items.map((item) => ({
            ...item,
            image: withBaseUrl(item.image),
          }));
        }
      }

      if (type === 'promoGrid') {
        if (Array.isArray(config.items)) {
          config.items = config.items.map((item) => ({
            ...item,
            image: withBaseUrl(item.image),
          }));
        }
      }

      return {
        ...section.toObject(),
        config,
      };
    })
  );

  res.json({ sections: hydratedSections });
});

// PATCH /api/cms
const updateCmsLayout = asyncHandler(async (req, res) => {
  const { route, sections } = req.body;

  if (!route || !Array.isArray(sections)) {
    res.status(400);
    throw new Error('Invalid route or sections');
  }

  const cms = await CMS.findOneAndUpdate(
    { route },
    { sections },
    { upsert: true, new: true }
  );

  res.json({ message: 'CMS layout updated', cms });
});

export { getCmsByRoute, updateCmsLayout };
