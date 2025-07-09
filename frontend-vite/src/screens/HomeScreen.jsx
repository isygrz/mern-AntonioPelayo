import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import SectionRenderer from '../components/SectionRenderer'; // ✅ new

// 🧪 Temporary mock layout config (will be server-driven later)
const mockSections = [
  {
    id: 's1',
    type: 'hero',
    placement: '/',
    isActive: true,
    order: 1,
    props: {
      title: 'Vibrant Handmade Tiles',
      subtitle: 'Inspired by Jalisco’s artistry',
      image: '/images/p1.jpeg',
      ctaText: 'Shop Now',
      ctaLink: '/',
    },
  },
  {
    id: 's2',
    type: 'promogrid',
    placement: '/',
    isActive: true,
    order: 2,
    props: {
      heading: 'Popular Collections',
    },
  },
  {
    id: 's3',
    type: 'blogpreview',
    placement: '/',
    isActive: true,
    order: 3,
    props: {},
  },
];

function HomeScreen() {
  const products = useSelector((state) => state.product.products);
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
      {/* ✅ CMS-Driven Visual Sections */}
      <SectionRenderer sections={mockSections} />

      {/* 🔹 Product Feed */}
      <h1 className="text-3xl font-sans text-slate-gray mb-10 text-left">
        Featured Products
      </h1>
      <div className="flex flex-wrap justify-between gap-y-8 max-w-screen-xl mx-auto">
        {products.map((product) => (
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
