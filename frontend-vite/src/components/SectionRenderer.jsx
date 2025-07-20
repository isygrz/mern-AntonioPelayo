import React from 'react';
import HeroSection from './sections/HeroSection';
import PromoGridSection from './sections/PromoGridSection';
import BlogPreviewSection from './sections/BlogPreviewSection';

// CMS Sections
import TestimonialSection from './sections/TestimonialSection';
import NewsletterSignupSection from './sections/NewsletterSignupSection';
import CtaBannerSection from './sections/CtaBannerSection';
import ImageGallerySection from './sections/ImageGallerySection';
import QuoteBlockSection from './sections/QuoteBlockSection';
import FeatureListSection from './sections/FeatureListSection';
import DividerSection from './sections/DividerSection';
import VideoEmbedSection from './sections/VideoEmbedSection';
import FaqAccordionSection from './sections/FaqAccordionSection';
import EventCountdownSection from './sections/EventCountdownSection';
import MapEmbedSection from './sections/MapEmbedSection';
import CustomHtmlSection from './sections/CustomHtmlSection';
import CarouselSection from './sections/CarouselSection';
import CollectionShowcaseSection from './sections/CollectionShowcaseSection';
import ProductHighlightSection from './sections/ProductHighlightSection';
import SocialEmbedSection from './sections/SocialEmbedSection';

const SectionRenderer = ({ sections = [], blogs = [] }) => {
  if (!sections.length) {
    console.warn('⚠️ No CMS sections to render');
    return null;
  }

  console.log('📦 CMS sections passed to renderer:', sections);

  return (
    <>
      {sections.map((section, idx) => {
        const { type, settings, order, enabled } = section;
        const key = `${type}-${idx}`;
        console.info('🧩 Rendering section type:', type);

        const commonProps = { settings, order, enabled };

        switch (type) {
          case 'hero':
            return <HeroSection key={key} {...commonProps} />;

          case 'promoGrid':
            return <PromoGridSection key={key} {...commonProps} />;

          case 'blogPreview':
            return (
              <BlogPreviewSection key={key} {...commonProps} blogs={blogs} />
            );

          case 'testimonial':
            return <TestimonialSection key={key} {...commonProps} />;

          case 'newsletterSignup':
            return <NewsletterSignupSection key={key} {...commonProps} />;

          case 'ctaBanner':
            return <CtaBannerSection key={key} {...commonProps} />;

          case 'imageGallery':
            return <ImageGallerySection key={key} {...commonProps} />;

          case 'quoteBlock':
            return <QuoteBlockSection key={key} {...commonProps} />;

          case 'featureList':
            return <FeatureListSection key={key} {...commonProps} />;

          case 'divider':
            return <DividerSection key={key} {...commonProps} />;

          case 'videoEmbed':
            return <VideoEmbedSection key={key} {...commonProps} />;

          case 'faqAccordion':
            return <FaqAccordionSection key={key} {...commonProps} />;

          case 'eventCountdown':
            return <EventCountdownSection key={key} {...commonProps} />;

          case 'mapEmbed':
            return <MapEmbedSection key={key} {...commonProps} />;

          case 'customHTML':
            return <CustomHtmlSection key={key} {...commonProps} />;

          case 'carousel':
            return <CarouselSection key={key} {...commonProps} />;

          case 'collectionShowcase':
            return <CollectionShowcaseSection key={key} {...commonProps} />;

          case 'productHighlight':
            return <ProductHighlightSection key={key} {...commonProps} />;

          case 'socialEmbed':
            return <SocialEmbedSection key={key} {...commonProps} />;

          default:
            console.warn('⚠️ Unknown CMS section type:', type);
            return null;
        }
      })}
    </>
  );
};

export default SectionRenderer;
