import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  fetchCmsByRoute,
  updateCmsLayout,
  resetCmsStatus,
} from '../../redux/slices/cmsSlice';
import { toast } from 'react-hot-toast';
import SectionRow from '../../components/admin/SectionRow';
import AddEditSectionModal from '../../components/modals/AddEditSectionModal';
import { generateSecureId } from '../../utils/generateSecureId';

const SettingsManager = () => {
  const dispatch = useDispatch();
  const { pathname: route } = useLocation();
  const { sections, loading, success, error } = useSelector(
    (state) => state.cms
  );

  const [localSections, setLocalSections] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [selectedType, setSelectedType] = useState('hero');

  // 🔁 Fetch CMS layout on mount and route change
  useEffect(() => {
    dispatch(fetchCmsByRoute(route));
  }, [dispatch, route]);

  useEffect(() => {
    if (sections) setLocalSections(sections);
  }, [sections]);

  useEffect(() => {
    if (success) {
      toast.success('Layout saved successfully');
      dispatch(resetCmsStatus());
    }
    if (error) {
      toast.error('Error saving layout');
      dispatch(resetCmsStatus());
    }
  }, [success, error, dispatch]);

  const handleSave = () => {
    dispatch(updateCmsLayout({ route, sections: localSections }));
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setModalOpen(true);
  };

  const handleDeleteSection = (id) => {
    setLocalSections((prev) => prev.filter((s) => s.id !== id));
    toast.success('Section deleted');
  };

  const handleReorder = (updated) => {
    setLocalSections(updated);
  };

  const handleModalSave = (updatedSection) => {
    setLocalSections((prev) =>
      prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
    );
    setModalOpen(false);
  };

  const handleModalAdd = (type) => {
    const newSection = {
      id: generateSecureId(),
      type,
      config: {},
    };
    setLocalSections((prev) => [...prev, newSection]);
    setModalOpen(false);
  };

  const handleAddSection = () => {
    handleModalAdd(selectedType);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">🔧 Layout Settings</h2>

      {loading && <p className="text-sm text-gray-500">Loading layout...</p>}

      <div className="space-y-2">
        {localSections.map((section, index) => (
          <SectionRow
            key={section.id}
            section={section}
            index={index}
            onDelete={handleDeleteSection}
            onEdit={handleEditSection}
            onReorder={handleReorder}
            allSections={localSections}
            setAllSections={setLocalSections}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          💾 Save Layout
        </button>

        <div className="flex items-center space-x-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value="hero">Hero</option>
            <option value="promoGrid">Promo Grid</option>
            <option value="blogPreview">Blog Preview</option>
            <option value="testimonial">Testimonial</option>
            <option value="ctaBanner">CTA Banner</option>
            <option value="imageGallery">Image Gallery</option>
            <option value="faqAccordion">FAQ Accordion</option>
            <option value="divider">Divider</option>
            {/* Extend with more CMS section types */}
          </select>

          <button
            onClick={handleAddSection}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ➕ Add Section
          </button>
        </div>
      </div>

      {modalOpen && (
        <AddEditSectionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={editingSection ? handleModalSave : handleModalAdd}
          existingSection={editingSection}
        />
      )}
    </div>
  );
};

export default SettingsManager;
