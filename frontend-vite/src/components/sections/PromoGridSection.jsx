import React from 'react';

const PromoGridSection = ({ config }) => {
  const tiles = config?.tiles ||
    config?.items || [
      { title: 'Tile 1', description: 'Promo 1' },
      { title: 'Tile 2', description: 'Promo 2' },
      { title: 'Tile 3', description: 'Promo 3' },
    ];

  return (
    <section className="py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiles.map((tile, index) => (
        <div key={index} className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">{tile.title}</h2>
          <p className="text-gray-600">{tile.description}</p>
        </div>
      ))}
    </section>
  );
};

export default PromoGridSection;
