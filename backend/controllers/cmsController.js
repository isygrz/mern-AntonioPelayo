// Purpose: serve hydrated CMS sections for a route and allow updating layout.
// Notes:
// - Dev: Cache-Control: no-store (instant changes)
// - Prod: short cache for GET (helps TTFB without stale content)
// - All image paths are normalized to absolute using ASSET_BASE_URL or request host.

import CMS from '../models/Cms.model.js';
import Blog from '../models/Blog.js';
import Product from '../models/Product.js';
import Hero from '../models/Hero.js';
import logger from '../utils/logger.js';

const isProd = process.env.NODE_ENV === 'production';
const FALLBACK_IMAGE = '/uploads/default.jpeg';

/** Build absolute URL from a relative path */
function buildAbsoluteUrl(req, relPath) {
  let p = (relPath ?? '').toString();
  if (!p.startsWith('/')) p = '/' + p;
  const base =
    process.env.ASSET_BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${base}${p}`;
}

/** Normalize and sanitize any image string into an absolute URL */
function safeImage(req, img) {
  let val = (img ?? '').toString().trim().replace(/\\/g, '/');
  if (!val) return buildAbsoluteUrl(req, FALLBACK_IMAGE);
  if (/^https?:\/\//i.test(val)) return val;

  // Ensure anything under /uploads resolves correctly
  const lower = val.toLowerCase();
  if (lower.includes('/uploads/')) {
    const idx = lower.lastIndexOf('/uploads/');
    const tail = val
      .slice(idx + '/uploads/'.length)
      .replace(/^\/+/, '')
      .replace(/^\/+/, '');
    return buildAbsoluteUrl(req, `/uploads/${tail}`);
  }
  if (/^\/?uploads\//i.test(val)) {
    return buildAbsoluteUrl(req, `/${val.replace(/^\/+/, '')}`);
  }
  if (/\.(jpeg|jpg|png|webp)$/i.test(val)) {
    return buildAbsoluteUrl(req, `/uploads/${val.replace(/^\/+/, '')}`);
  }
  return buildAbsoluteUrl(req, FALLBACK_IMAGE);
}

/** Extract a slug from a link with the given prefix */
function getSlugFromLink(link = '', prefix = '/product/') {
  try {
    if (!link) return undefined;
    const url = new URL(link, 'http://placeholder');
    const path = url.pathname || '';
    if (path.startsWith(prefix)) {
      return path.replace(prefix, '').replace(/^\/+|\/+$/g, '');
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/** GET /api/cms?route=/ */
export async function getCmsByRoute(req, res) {
  try {
    // Sensible caching headers
    if (isProd) {
      // allow short cache in prod to keep admin edits visible quickly
      res.set('Cache-Control', 'public, max-age=30');
    } else {
      res.set('Cache-Control', 'no-store');
    }

    const route = req.query.route || '/';
    const cms = await CMS.findOne({ route });

    if (!cms || !Array.isArray(cms.sections) || cms.sections.length === 0) {
      logger?.debug?.('[cms] no sections for', route);
      return res.json({ sections: [] });
    }

    const hydratedSections = await Promise.all(
      cms.sections.map(async (sectionDoc) => {
        const type = sectionDoc.type;
        // support Mongoose docs or plain objects
        const section = { ...(sectionDoc.toObject?.() ?? sectionDoc) };
        const config = { ...(section.config || {}) };

        // HERO
        if (type === 'hero') {
          const hero = await Hero.findOne().lean();
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
        }

        // PROMO GRID
        if (type === 'promoGrid') {
          const items = Array.isArray(config.items) ? config.items : [];
          config.items = items.map((it, idx) => ({
            title: it?.title ?? `Tile ${idx + 1}`,
            image: safeImage(req, it?.image),
            link: it?.link || '/products',
          }));
        }

        // FEATURED PRODUCTS
        if (type === 'featuredProduct') {
          if (!Array.isArray(config.items) || config.items.length === 0) {
            const top = await Product.find()
              .sort({ rating: -1 })
              .limit(4)
              .lean();
            config.items = top.map((p) => ({
              title: p.name,
              image: safeImage(req, p.image || p.imageGallery?.[0]),
              slug: p.slug,
              link: `/product/${p.slug}`,
            }));
          } else {
            config.items = config.items.map((it) => {
              const slug = it?.slug || getSlugFromLink(it?.link, '/product/');
              return {
                ...it,
                image: safeImage(req, it?.image),
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
              .limit(3)
              .lean();
            config.items = blogs.map((b) => ({
              title: b.title,
              image: safeImage(req, b.image),
              slug: b.slug,
              link: `/blog/${b.slug}`,
            }));
          } else {
            config.items = config.items.map((it) => {
              const slug = it?.slug || getSlugFromLink(it?.link, '/blog/');
              return {
                ...it,
                image: safeImage(req, it?.image),
                slug,
                link: it?.link || (slug ? `/blog/${slug}` : undefined),
              };
            });
          }
        }

        return { ...section, config };
      })
    );

    return res.json({ sections: hydratedSections });
  } catch (err) {
    logger?.error?.('[cms] getCmsByRoute failed', err);
    // Dev homepage should never be blocked by a 500
    return res.json({ sections: [] });
  }
}

/** PUT /api/cms  { route, sections } */
export async function updateCmsLayout(req, res) {
  try {
    const { route, sections } = req.body || {};
    if (!route || !Array.isArray(sections)) {
      return res.status(400).json({ message: 'Invalid route or sections' });
    }
    const cms = await CMS.findOneAndUpdate(
      { route },
      { sections },
      { upsert: true, new: true }
    );
    return res.json({ message: 'CMS layout updated', cms });
  } catch (err) {
    logger?.error?.('[cms] updateCmsLayout failed', err);
    return res.status(400).json({ message: 'Invalid CMS payload' });
  }
}

// Back-compat alias
export const patchCmsLayout = updateCmsLayout;

// Health probe
export const cmsHealth = (_req, res) => {
  return res.json({ ok: true, ts: Date.now() });
};

/** NEW: GET /api/cms/footer
 *  Minimal placeholder for MVP; frontend caches snapshot and renders safely offline.
 *  Replace later with DB-backed Footer model.
 */
export const getFooter = async (_req, res) => {
  try {
    if (isProd) {
      res.set('Cache-Control', 'public, max-age=60');
    } else {
      res.set('Cache-Control', 'no-store');
    }
    const links = [
      { label: 'Home', url: '/' },
      { label: 'Shop', url: '/search' },
      { label: 'Blog', url: '/blog' },
      { label: 'Contact', url: '/contact' },
    ];
    return res.json({ links, updatedAt: new Date().toISOString() });
  } catch (err) {
    logger?.error?.('[cms] getFooter failed', err);
    return res.status(500).json({ message: 'Failed to load footer' });
  }
};
