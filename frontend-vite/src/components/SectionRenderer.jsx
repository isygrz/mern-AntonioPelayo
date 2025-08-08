import HeroSection from './sections/HeroSection.jsx';
import PromoGridSection from './sections/PromoGridSection.jsx';
import FeaturedProductSection from './sections/FeaturedProductSection.jsx';
import BlogPreviewSection from './sections/BlogPreviewSection.jsx';

// Map CMS section types to their corresponding React components
const SECTION_MAP = {
  hero: HeroSection,
  promoGrid: PromoGridSection,
  featuredProduct: FeaturedProductSection,
  blogPreview: BlogPreviewSection,
};

const SectionRenderer = ({ sections = [], products = [], blogs = [] }) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <p className="text-center text-gray-500">No CMS sections to display.</p>
    );
  }

  console.log('🔍 CMS Sections in Renderer:', sections);

  return (
    <>
      {sections.map((section, index) => {
        const { type, config = {}, enabled = false } = section;

        if (!enabled || !type) return null;

        const Component = SECTION_MAP[type];

        if (!Component) {
          console.warn(`⚠️ Unknown CMS section type: '${type}'`);
          return null;
        }

        return (
          <div key={index} className="section-wrapper">
            <Component config={config} products={products} blogs={blogs} />
          </div>
        );
      })}
    </>
  );
};

export default SectionRenderer;
