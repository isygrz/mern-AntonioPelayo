import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Footer (hardened)
 * - Internal vs external resolution
 * - Never yields an empty <Link to>
 * - Known label mapping: 'Blog' -> /blog
 * - Same-tab behavior for all links per #192
 * - Guards against invalid/unsafe hrefs (e.g., javascript:)
 */

const slugify = (label = '') =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const isProbablyExternal = (url = '') => {
  if (!url) return false;
  // allow http(s), protocol-relative, mailto, tel as external-ish
  if (/^(https?:)?\/\//i.test(url)) return true;
  if (/^(mailto:|tel:)/i.test(url)) return true;
  return false;
};

const isUnsafeHref = (url = '') => /^javascript:/i.test(url || '');

const coerceInternalUrl = (label = '', url = '') => {
  // Known mappings
  const l = (label || '').trim().toLowerCase();
  if (!url) {
    if (l === 'blog') return '/blog';
    // fallback to slugged label
    return `/${slugify(label || 'link')}`;
  }
  // ensure leading slash for internal-ish urls like 'blog', 'contact'
  if (!url.startsWith('/')) return `/${slugify(url)}`;
  return url;
};

const Footer = () => {
  const { footer } = useSelector((state) => state.footer || {});
  if (!footer) return null;

  const links = Array.isArray(footer?.links) ? footer.links : [];

  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 mt-20 px-4">
      <div className="max-w-6xl mx-auto text-sm text-center md:text-left">
        {links.length > 0 ? (
          <ul className="flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-8">
            {links.map((link, idx) => {
              const label = (link?.label || 'Link').trim() || 'Link';
              const rawUrl = (link?.url || '').trim();

              // Safety guard
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
                ? rawUrl // http(s), mailto, tel
                : coerceInternalUrl(label, rawUrl); // never empty

              // If still somehow empty (shouldn't be), render as non-clickable text
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
      </div>

      <div className="text-xs text-center mt-8 text-gray-500">
        © {new Date().getFullYear()} Jalisco Tile. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
