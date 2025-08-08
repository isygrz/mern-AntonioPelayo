import React from 'react';

const HeroSection = ({ config }) => {
  const {
    title = 'Welcome to Our Store',
    subtitle = 'Find the best products curated for you.',
    backgroundImage = '',
    ctaText = '',
    ctaLink = '',
  } = config || {};

  return (
    <section
      className="py-16 px-4 text-center bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? 'transparent' : '#f3f4f6',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-700 mb-6">{subtitle}</p>
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-block bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
