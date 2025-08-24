import Footer from '../models/Footer.js';
import logger from '../utils/logger.js';

const isDev = (process.env.NODE_ENV || 'development') === 'development';

const setCacheHeaders = (res) => {
  if (isDev) {
    // Dev: always show 200 in DevTools and avoid stale data while iterating
    res.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  } else {
    // Prod: short caching with SWR keeps UI snappy without going stale for long
    // Clients may cache for 60s; can serve stale for 5m while revalidating in background
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  }
};

const coerceToLinks = (doc) => {
  try {
    if (!doc) return [];
    if (Array.isArray(doc.links)) return doc.links;
    if (Array.isArray(doc.sections)) {
      return doc.sections
        .map((s) => {
          const label = (s?.label ?? s?.title ?? '').toString().trim();
          const url = (s?.url ?? s?.href ?? '').toString().trim();
          return label ? { label, url } : null;
        })
        .filter(Boolean);
    }
    return [];
  } catch (e) {
    logger?.warn?.('[footer] coerceToLinks fallback', e);
    return [];
  }
};

// Optional probe for DebugPanel
export const footerHealth = (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
};

export const getFooter = async (_req, res) => {
  try {
    setCacheHeaders(res);
    const footer = await Footer.findOne();
    const links = coerceToLinks(footer);
    return res.json({
      links,
      updatedAt: footer?.updatedAt || new Date().toISOString(),
    });
  } catch (err) {
    logger?.error?.('[footer] getFooter failed', err);
    setCacheHeaders(res);
    return res.json({ links: [], updatedAt: new Date().toISOString() });
  }
};

export const updateFooter = async (req, res) => {
  try {
    const incoming = req.body || {};
    const sectionsIn = Array.isArray(incoming.sections)
      ? incoming.sections
      : null;
    const linksIn = Array.isArray(incoming.links) ? incoming.links : null;

    const normalizedSections = sectionsIn
      ? sectionsIn
      : (linksIn || []).map((l) => ({
          label: (l?.label ?? '').toString().trim(),
          url: (l?.url ?? '').toString().trim(),
        }));

    // Basic sanitize: drop empties
    const sections = (normalizedSections || []).filter(
      (s) => s && (s.label || '').trim().length > 0
    );

    const updated = await Footer.findOneAndUpdate(
      {},
      { sections },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Apply cache headers on write response too
    setCacheHeaders(res);

    return res.json({
      links: coerceToLinks(updated),
      updatedAt: updated?.updatedAt || new Date().toISOString(),
    });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid footer payload' });
  }
};
