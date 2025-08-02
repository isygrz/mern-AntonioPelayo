import React from 'react';

const HeroSection = ({ config }) => {
  return (
    <section className="bg-gray-100 py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {config?.title || 'Welcome to Our Store'}
      </h1>
      <p className="text-lg text-gray-700">
        {config?.subtitle || 'Find the best products curated for you.'}
      </p>
    </section>
  );
};

export default HeroSection;
