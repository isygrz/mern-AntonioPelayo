import React from 'react';

const PromoGridSection = ({ config }) => {
  const items = config?.items || [];

  if (items.length === 0) return null;

  return (
    <section className="py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="mb-4 w-full h-48 object-cover rounded"
            />
          )}
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          {item.link && (
            <a
              href={item.link}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              Shop Now →
            </a>
          )}
        </div>
      ))}
    </section>
  );
};

export default PromoGridSection;
