import { Link } from 'react-router-dom';
import log from '@/utils/logger';

export default function BlogPreviewSection({ config }) {
  const items = Array.isArray(config?.items) ? config.items : [];

  if (items.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, idx) => {
          const href = item?.link || (item?.slug ? `/blog/${item.slug}` : '#');
          if (!item?.link && !item?.slug) {
            log.warn('[BlogPreviewSection] Missing link/slug for item', item);
          }
          return (
            <Link
              key={idx}
              to={href}
              className="block border rounded-lg overflow-hidden hover:shadow transition"
            >
              <div className="aspect-[16/9] bg-slate-100">
                {item?.image ? (
                  <img
                    src={item.image}
                    alt={item?.title || 'Blog cover'}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium">
                  {item?.title || 'Untitled Post'}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
