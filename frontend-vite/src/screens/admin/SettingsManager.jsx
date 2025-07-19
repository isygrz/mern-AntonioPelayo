import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCmsByRoute,
  updateCms,
  resetCmsStatus,
  reorderCmsSections,
} from '@/redux/slices/cmsSlice';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import SortableItem from '@/components/SortableItem';
import SectionRow from '@/components/SectionRow';
import toast from 'react-hot-toast';
import AddEditSectionModal from '@/components/modals/AddEditSectionModal';

import HeroSection from '@/components/HeroSection';
import PromoGridSection from '@/components/PromoGridSection';
import BlogPreviewSection from '@/components/BlogPreviewSection';

const DEFAULT_SECTION = {
  enabled: true,
  order: 0,
  settings: {},
};

const sectionTypes = [
  'hero',
  'promoGrid',
  'blogPreview',
  'testimonial',
  'newsletterSignup',
  'ctaBanner',
  'imageGallery',
  'quoteBlock',
  'featureList',
  'divider',
  'videoEmbed',
  'faqAccordion',
  'eventCountdown',
  'mapEmbed',
  'customHTML',
  'carousel',
  'collectionShowcase',
  'productHighlight',
  'socialEmbed',
];

const sectionPreviews = {
  hero: HeroSection,
  promoGrid: PromoGridSection,
  blogPreview: BlogPreviewSection,
};

const SettingsManager = () => {
  const dispatch = useDispatch();
  const {
    sections = [],
    status,
    loading,
    error,
  } = useSelector((state) => state.cms);

  const [localSections, setLocalSections] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchCmsByRoute(selectedRoute));
    return () => dispatch(resetCmsStatus());
  }, [dispatch, selectedRoute]);

  useEffect(() => {
    if (sections.length) {
      const enriched = sections.map((section) => ({
        id: section._id || uuidv4(),
        ...section,
      }));
      setLocalSections(enriched);
    }
  }, [sections]);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('✔ CMS layout saved successfully!');
    } else if (status === 'failed') {
      toast.error(`❌ Error saving layout: ${error}`);
    }
  }, [status, error]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localSections.findIndex((s) => s.id === active.id);
    const newIndex = localSections.findIndex((s) => s.id === over.id);

    const reordered = arrayMove(localSections, oldIndex, newIndex).map(
      (s, i) => ({
        ...s,
        order: i,
      })
    );

    setLocalSections(reordered);
    dispatch(reorderCmsSections(reordered));
  };

  const handleManualReorder = (from, to) => {
    if (to < 0 || to >= localSections.length) return;
    const reordered = arrayMove(localSections, from, to).map((s, i) => ({
      ...s,
      order: i,
    }));
    setLocalSections(reordered);
    dispatch(reorderCmsSections(reordered));
  };

  const handleAddSection = (type) => {
    const newSection = {
      ...DEFAULT_SECTION,
      id: uuidv4(),
      type,
      order: localSections.length,
    };
    setLocalSections((prev) => [...prev, newSection]);
  };

  const handleFieldChange = (idx, field, value) => {
    const updated = [...localSections];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalSections(updated);
  };

  const handleSettingsSave = (newSettings) => {
    if (editingSectionIndex !== null) {
      const updated = [...localSections];
      updated[editingSectionIndex] = {
        ...updated[editingSectionIndex],
        settings: newSettings,
      };
      setLocalSections(updated);
      setEditingSectionIndex(null);
    }
  };

  const handleDeleteSection = (idx) => {
    const updated = localSections.filter((_, i) => i !== idx);
    setLocalSections(updated.map((s, i) => ({ ...s, order: i })));
  };

  const handleSave = () => {
    dispatch(updateCms({ route: selectedRoute, sections: localSections }));
  };

  const renderPreview = (section) => {
    const PreviewComponent = sectionPreviews[section.type];
    if (PreviewComponent) {
      return (
        <div className="border border-dashed border-neutral-300 dark:border-neutral-600 rounded p-2 mt-2 bg-white dark:bg-slate-900">
          <PreviewComponent {...section} />
        </div>
      );
    }
    return (
      <div className="mt-1 text-xs italic text-neutral-400">
        🧩 Preview not available for <strong>{section.type}</strong>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">CMS Layout Editor</h1>

      {loading && (
        <div className="text-sm text-yellow-600">Loading layout...</div>
      )}

      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm">Route:</label>
        <input
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="px-2 py-1 border rounded bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
        />
        <button
          onClick={() => dispatch(fetchCmsByRoute(selectedRoute))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Load
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {sectionTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleAddSection(type)}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs capitalize"
          >
            + {type}
          </button>
        ))}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={localSections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {localSections.map((section, idx) => (
            <SortableItem key={section.id} id={section.id}>
              <SectionRow
                index={idx}
                section={section}
                onFieldChange={handleFieldChange}
                onReorder={handleManualReorder}
                onDeleteSection={handleDeleteSection}
                onEditSettings={() => setEditingSectionIndex(idx)}
              />
              {renderPreview(section)}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>

      <AddEditSectionModal
        isOpen={editingSectionIndex !== null}
        onClose={() => setEditingSectionIndex(null)}
        section={localSections[editingSectionIndex] || {}}
        onSave={handleSettingsSave}
      />
    </div>
  );
};

export default SettingsManager;
