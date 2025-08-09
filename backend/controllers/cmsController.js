import asyncHandler from '../middleware/asyncHandler.js';
import CMS from '../models/Cms.model.js';
import Blog from '../models/Blog.js';
import Product from '../models/Product.js';
import Hero from '../models/Hero.js';

const FALLBACK_IMAGE = '/uploads/default.jpeg';
const isProd = process.env.NODE_ENV === 'production';

// Helper to prepend absolute base URL
const buildAbsoluteUrl = (req, relPath) => {
  if (!relPath?.startsWith('/')) relPath = '/' + (relPath || '');
  const baseUrl =
    process.env.ASSET_BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${relPath}`;
};

// Enhanced safeImage to always return absolute URLs
const safeImage = (req, img) => {
  let val = (img ?? '').toString().trim().replace(/\\/g, '/');
  if (!val) return buildAbsoluteUrl(req, FALLBACK_IMAGE);
  if (/^https?:\/\//i.test(val)) return val; // already absolute

  const uploadsIdx = val.toLowerCase().lastIndexOf('/uploads/');
  if (uploadsIdx !== -1) {
    const tail = val.slice(uploadsIdx + '/uploads/'.length).replace(/^\/+/, '');
    return buildAbsoluteUrl(req, `/uploads/${tail}`);
  }
  if (/^uploads\//i.test(val)) return buildAbsoluteUrl(req, `/${val}`);
  if (/^\/uploads\//i.test(val)) return buildAbsoluteUrl(req, val);
  if (/\.(jpeg|jpg|png|webp)$/i.test(val)) {
    return buildAbsoluteUrl(req, `/uploads/${val.replace(/^\/+/, '')}`);
  }
  return buildAbsoluteUrl(req, FALLBACK_IMAGE);
};

const log = (...args) => {
  if (!isProd) console.log('[cms]', ...args);
};

const getSlugFromLink = (link = '', prefix = '/product/') => {
  try {
    if (!link) return undefined;
    const url = new URL(link, 'http://placeholder'); // base to parse relative
    const path = url.pathname || '';
    if (path.startsWith(prefix)) {
      return path.replace(prefix, '').replace(/^\/+|\/+$/g, '');
    }
    return undefined;
  } catch {
    return undefined;
  }
};

// GET /api/cms?route=/
const getCmsByRoute = asyncHandler(async (req, res) => {
  const route = req.query.route || '/';
  const cms = await CMS.findOne({ route });

  if (!cms || !Array.isArray(cms.sections) || cms.sections.length === 0) {
    log(`No CMS sections found for route: ${route}`);
    return res.json({ sections: [] });
  }

  const hydratedSections = await Promise.all(
    cms.sections.map(async (sectionDoc) => {
      const type = sectionDoc.type;
      const section = { ...(sectionDoc.toObject?.() ?? sectionDoc) };
      const config = { ...(section.config || {}) };

      // HERO
      if (type === 'hero') {
        const hero = await Hero.findOne();
        if (!config.title) config.title = hero?.heading || 'Vibrant Designs';
        if (!config.subtitle)
          config.subtitle =
            hero?.subheading || 'Bring bold Mexican flair to your home';
        if (!config.ctaText) config.ctaText = hero?.ctaText || 'Shop Now';
        if (!config.ctaLink) config.ctaLink = hero?.link || '/products';
        config.backgroundImage = safeImage(
          req,
          config.backgroundImage || hero?.image
        );
        log('Hero backgroundImage →', config.backgroundImage);
      }

      // PROMO GRID
      if (type === 'promoGrid') {
        const items = Array.isArray(config.items) ? config.items : [];
        config.items = items.map((it, idx) => {
          const img = safeImage(req, it?.image);
          log(`PromoGrid[${idx}] image →`, img);
          return {
            title: it?.title ?? `Tile ${idx + 1}`,
            image: img,
            link: it?.link || '/products',
          };
        });
      }

      // FEATURED PRODUCT
      if (type === 'featuredProduct') {
        if (!Array.isArray(config.items) || config.items.length === 0) {
          const top = await Product.find().sort({ rating: -1 }).limit(4);
          config.items = top.map((p, idx) => {
            const img = safeImage(req, p.image || p.imageGallery?.[0]);
            const slug = p.slug;
            log(`FeaturedProduct[${idx}] (fallback) image →`, img);
            return {
              title: p.name,
              image: img,
              slug,
              link: `/product/${slug}`,
            };
          });
        } else {
          config.items = config.items.map((it, idx) => {
            const img = safeImage(req, it?.image);
            const slug = it?.slug || getSlugFromLink(it?.link, '/product/');
            log(`FeaturedProduct[${idx}] image →`, img);
            return {
              ...it,
              image: img,
              slug,
              link: it?.link || (slug ? `/product/${slug}` : undefined),
            };
          });
        }
      }

      // BLOG PREVIEW
      if (type === 'blogPreview') {
        if (!Array.isArray(config.items) || config.items.length === 0) {
          const blogs = await Blog.find({ published: true })
            .sort({ createdAt: -1 })
            .limit(3);
          config.items = blogs.map((b, idx) => {
            const img = safeImage(req, b.image);
            const slug = b.slug;
            log(`BlogPreview[${idx}] (fallback) image →`, img);
            return {
              title: b.title,
              image: img,
              slug,
              link: `/blog/${slug}`,
            };
          });
        } else {
          config.items = config.items.map((it, idx) => {
            const img = safeImage(req, it?.image);
            const slug = it?.slug || getSlugFromLink(it?.link, '/blog/');
            log(`BlogPreview[${idx}] image →`, img);
            return {
              ...it,
              image: img,
              slug,
              link: it?.link || (slug ? `/blog/${slug}` : undefined),
            };
          });
        }
      }

      return { ...section, config };
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
