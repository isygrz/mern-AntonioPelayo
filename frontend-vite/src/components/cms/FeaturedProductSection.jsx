import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard';

const FeaturedProductSection = ({ config }) => {
  const { products } = useSelector((state) => state.products);
  const featured = products
    .filter((p) => p.isFeatured)
    .slice(0, config?.maxItems || 4);

  return (
    <section className="px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          {config?.title || 'Featured Products'}
        </h2>
        {config?.subtitle && <p className="text-gray-600">{config.subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductSection;
