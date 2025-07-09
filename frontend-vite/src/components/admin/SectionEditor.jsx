import { useState } from 'react';
import ImagePicker from './ImagePicker';

const SectionEditor = ({ section, onSave, onCancel }) => {
  const [form, setForm] = useState({
    id: section.id || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    image: section.image || '',
    ctaText: section.ctaText || '',
    ctaLink: section.ctaLink || '',
    placement: section.placement || '/',
    isActive: section.isActive ?? true,
  });

  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-xl relative">
        <h2 className="text-lg font-bold mb-4">
          {form.id ? 'Edit Section' : 'New Section'}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
          />
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="border p-2 rounded"
          />
          <input
            name="ctaText"
            value={form.ctaText}
            onChange={handleChange}
            placeholder="CTA Text"
            className="border p-2 rounded"
          />
          <input
            name="ctaLink"
            value={form.ctaLink}
            onChange={handleChange}
            placeholder="CTA Link"
            className="border p-2 rounded"
          />

          <div>
            <label className="block mb-1 text-sm">Placement</label>
            <select
              name="placement"
              value={form.placement}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="/">Home</option>
              <option value="/category/handmade">Handmade Tiles</option>
              <option value="/category/flooring">Flooring</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Hero Image</label>
            <div className="flex items-center gap-3">
              {form.image && (
                <img src={form.image} alt="preview" className="h-16 rounded" />
              )}
              <button
                onClick={() => setShowPicker(true)}
                className="text-sm text-indigo-600 underline"
              >
                Select Image
              </button>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onCancel}
              className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {showPicker && (
        <ImagePicker
          onSelect={(src) => {
            setForm({ ...form, image: src });
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
};

export default SectionEditor;
