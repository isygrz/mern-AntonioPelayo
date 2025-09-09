import React from 'react';
import { Link } from 'react-router-dom';
import { useFooter } from '@/hooks/useFooter';
import { isInternal } from '@/utils/url';

export default function Footer() {
  const { links } = useFooter();

  return (
    <footer
      className="mt-16 border-t border-gray-200 py-8"
      data-test="footer-root"
    >
      <div className="max-w-6xl mx-auto px-4">
        {!links || links.length === 0 ? (
          <ul className="text-sm text-gray-400" data-test="footer-links">
            {/* Intentionally empty when no links */}
          </ul>
        ) : (
          <ul
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
            data-test="footer-links"
          >
            {links.map((l) => {
              if (!l.url) return null;
              const internal = !l.external && isInternal(l.url);
              return (
                <li key={`${l.name}-${l.url}`}>
                  {internal ? (
                    <Link
                      to={l.url}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {l.name}
                    </Link>
                  ) : (
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {l.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </footer>
  );
}
