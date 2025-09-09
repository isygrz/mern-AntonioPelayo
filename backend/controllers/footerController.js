// Normalizes legacy links, sanitizes URLs, and provides both GET and PUT handlers.

import Footer from '../models/Footer.js';

/** sanitize URL: drop javascript:, data: */
const sanitizeUrl = (u) => {
  if (!u || typeof u !== 'string') return '';
  const s = u.trim();
  const lower = s.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:')) return '';
  return s;
};

/** guess internal path when only a label exists (legacy docs) */
const guessUrlFromLabel = (label = '') => {
  const key = String(label).trim().toLowerCase();
  if (key === 'about' || key === 'about us') return '/about';
  if (key === 'contact' || key === 'contact us') return '/contact';
  if (key === 'blog' || key === 'blogs') return '/blog';
  return '';
};

/** normalize one DB link into the shape the frontend expects */
const normalizeDbLink = (l = {}, idx = 0) => {
  const name = l.name ?? l.label ?? l.title ?? `Link ${idx + 1}`;
  const rawUrl =
    l.url ?? l.href ?? l.path ?? l.to ?? guessUrlFromLabel(l.label);
  const url = sanitizeUrl(rawUrl);
  const enabled = l.enabled !== false && Boolean(url);
  const order = Number.isFinite(l.order) ? l.order : idx;
  const external = /^https?:\/\//i.test(url);
  return { name, url, external, enabled, order };
};

/** GET /api/footer */
export const getFooter = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store');

    const doc = (await Footer.findOne({}, {}, { sort: { updatedAt: -1 } })) ?? {
      links: [],
      updatedAt: new Date(0),
    };

    let normalized = Array.isArray(doc.links)
      ? doc.links.map(normalizeDbLink).filter((l) => l.enabled)
      : [];

    // If still empty, return a small safe default so the UI renders
    if (normalized.length === 0) {
      normalized = [
        {
          name: 'About',
          url: '/about',
          external: false,
          enabled: true,
          order: 0,
        },
        {
          name: 'Contact',
          url: '/contact',
          external: false,
          enabled: true,
          order: 1,
        },
        {
          name: 'Blog',
          url: '/blog',
          external: false,
          enabled: true,
          order: 2,
        },
      ];
    }

    return res.json({
      updatedAt:
        (doc.updatedAt ?? new Date()).toISOString?.() ||
        new Date().toISOString(),
      links: normalized.sort((a, b) => a.order - b.order),
    });
  } catch (err) {
    next(err);
  }
};

/** PUT /api/footer (admin) */
export const updateFooter = async (req, res, next) => {
  try {
    const { links } = req.body || {};
    if (!Array.isArray(links)) {
      return res.status(400).json({ message: 'links must be an array' });
    }

    const normalized = links.map(normalizeDbLink).filter((l) => l.enabled);

    // Enforce http(s) for external links
    for (const l of normalized) {
      if (l.external && !/^https?:\/\//i.test(l.url)) {
        return res
          .status(400)
          .json({
            message: `External URL must start with http(s):// for "${l.name}"`,
          });
      }
    }

    const doc = await Footer.findOneAndUpdate(
      {},
      { links: normalized, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.set('Cache-Control', 'no-store');
    const out = (doc.links || []).map(normalizeDbLink).filter((l) => l.enabled);
    return res.json({
      updatedAt: doc.updatedAt.toISOString?.() || new Date().toISOString(),
      links: out,
    });
  } catch (err) {
    next(err);
  }
};
