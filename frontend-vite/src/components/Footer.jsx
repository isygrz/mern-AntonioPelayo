import { Link } from 'react-router-dom';
import useFooter from '@/hooks/useFooter';

/**
 * Footer (offline-aware)
 * - Renders links from CMS (with snapshot fallback)
 * - Shows a small "cached/offline" indicator when appropriate
 * - Guards internal/external URLs and avoids unsafe hrefs
 */

const slugify = (label = '') =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const isProbablyExternal = (url = '') => {
  if (!url) return false;
  if (/^(https?:)?\/\//i.test(url)) return true;
  if (/^(mailto:|tel:)/i.test(url)) return true;
  return false;
};

const isUnsafeHref = (url = '') => /^javascript:/i.test(url || '');

const coerceInternalUrl = (label = '', url = '') => {
  const l = (label || '').trim().toLowerCase();
  if (!url) {
    if (l === 'blog') return '/blog';
    return `/${slugify(label || 'link')}`;
  }
  if (!url.startsWith('/')) return `/${slugify(url)}`;
  return url;
};

const Footer = () => {
  const { data, stale, online, loading } = useFooter();
  const links = Array.isArray(data?.links) ? data.links : [];

  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 mt-20 px-4">
      <div className="max-w-6xl mx-auto text-sm text-center md:text-left">
        {loading ? (
          <div className="text-center text-gray-400">Loading footer…</div>
        ) : links.length > 0 ? (
          <ul className="flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-8">
            {links.map((link, idx) => {
              const label = (link?.label || 'Link').trim() || 'Link';
              const rawUrl = (link?.url || '').trim();

              if (isUnsafeHref(rawUrl)) {
                return (
                  <li
                    key={link?._id || idx}
                    className="opacity-60 cursor-not-allowed"
                  >
                    <span title="Invalid link">{label}</span>
                  </li>
                );
              }

              const external = isProbablyExternal(rawUrl);
              const finalUrl = external
                ? rawUrl
                : coerceInternalUrl(label, rawUrl);

              if (!finalUrl) {
                return (
                  <li
                    key={link?._id || idx}
                    className="opacity-60 cursor-not-allowed"
                  >
                    <span>{label}</span>
                  </li>
                );
              }

              return (
                <li key={link?._id || finalUrl || idx}>
                  {external ? (
                    <a
                      href={finalUrl}
                      className="hover:underline hover:text-white"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to={finalUrl}
                      className="hover:underline hover:text-white"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-gray-400">
            No footer content available.
          </div>
        )}

        {/* Offline/cached hint */}
        {(!online || stale) && (
          <div className="mt-3 text-center text-xs text-amber-400">
            {online
              ? 'Showing cached footer (recently offline).'
              : 'Offline — showing cached footer.'}
          </div>
        )}
      </div>

      <div className="text-xs text-center mt-8 text-gray-500">
        © {new Date().getFullYear()} Jalisco Tile. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
