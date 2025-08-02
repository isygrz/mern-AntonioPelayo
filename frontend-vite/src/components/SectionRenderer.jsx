import React from 'react';
import HeroSection from './sections/HeroSection';
import PromoGridSection from './sections/PromoGridSection';
import BlogPreviewSection from './sections/BlogPreviewSection';
import FeaturedProductSection from './sections/FeaturedProductSection';

const SectionRenderer = ({ sections = [] }) => {
  return (
    <>
      {sections.map((section, index) => {
        const { type, config = {} } = section;

        switch (type) {
          case 'hero':
            return <HeroSection key={`hero-${index}`} config={config} />;

          case 'promoGrid':
            return <PromoGridSection key={`promo-${index}`} config={config} />;

          case 'blogPreview':
            return <BlogPreviewSection key={`blog-${index}`} config={config} />;

          case 'featuredProduct':
            return (
              <FeaturedProductSection key={`feat-${index}`} config={config} />
            );

          default:
            return null; // unknown section type — skip silently
        }
      })}
    </>
  );
};

export default SectionRenderer;
