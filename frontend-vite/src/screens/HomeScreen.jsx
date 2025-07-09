import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import data from '../data';

function HomeScreen() {
  const [sampleCart, setSampleCart] = useState(new Set());

  const handleToggleSample = (slug) => {
    setSampleCart((prev) => {
      const updated = new Set(prev);
      updated.has(slug) ? updated.delete(slug) : updated.add(slug);
      return updated;
    });
  };

  return (
    <main className="px-4 py-4 bg-white min-h-screen">
      <h1 className="text-3xl font-sans text-slate-gray mb-10 text-left">
        Featured Products
      </h1>

      <div className="flex flex-wrap justify-between gap-y-8 max-w-screen-xl mx-auto">
        {data.products.map((product) => (
          <div key={product.slug} className="w-[23%] min-w-[200px]">
            <ProductCard
              product={product}
              inSampleCart={sampleCart.has(product.slug)}
              onToggleSample={handleToggleSample}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomeScreen;
