import React from 'react';

const FeaturedProductSection = ({ config }) => {
  const products = config?.items || [];

  if (!products.length) return null;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={product._id || index}
            className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <a
                href={`/product/${product.slug || product._id}`}
                className="text-blue-600 hover:underline"
              >
                View Product →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductSection;
