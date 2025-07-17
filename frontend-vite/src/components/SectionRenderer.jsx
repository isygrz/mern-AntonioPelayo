import React from 'react';
import HeroSection from './HeroSection';
import PromoGridSection from './PromoGridSection';
import BlogPreviewSection from './BlogPreviewSection';

const SectionRenderer = ({ sections = [], blogs = [] }) => {
  if (!sections || sections.length === 0) {
    console.warn('⚠️ No CMS sections to render');
    return null;
  }

  console.log('📦 CMS sections passed to renderer:', sections);

  return (
    <>
      {sections.map((section, idx) => {
        const { type, ...rest } = section;
        const section_id = `${type}-${idx}`;

        console.info('🧩 Rendering section type:', type);

        switch (type?.toLowerCase()) {
          case 'hero':
            return <HeroSection key={section_id} {...rest} />;

          case 'promogrid':
            return <PromoGridSection key={section_id} {...rest} />;

          case 'blogpreview':
            return (
              <BlogPreviewSection key={section_id} blogs={blogs} {...rest} />
            );

          default:
            console.warn('⚠️ Unknown section type:', type);
            return null;
        }
      })}
    </>
  );
};

export default SectionRenderer;
