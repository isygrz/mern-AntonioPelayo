import { Link } from 'react-router-dom';

export default function FeaturedProductSection({ config }) {
  const items = Array.isArray(config?.items) ? config.items : [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="my-10">
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const href =
            item?.link || (item?.slug ? `/product/${item.slug}` : '#');
          if (!item?.link && !item?.slug) {
            // eslint-disable-next-line no-console
            console.warn(
              '[FeaturedProductSection] Missing link/slug for item',
              item
            );
          }
          return (
            <Link
              key={idx}
              to={href}
              className="block border rounded-lg overflow-hidden hover:shadow transition"
            >
              <div className="aspect-[4/3] bg-slate-100">
                {item?.image ? (
                  <img
                    src={item.image}
                    alt={item?.title || 'Featured product'}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium">
                  {item?.title || 'Untitled Product'}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
