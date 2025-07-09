import { useState } from 'react';

const BadgeEditor = ({ badge, onSave, onCancel }) => {
  const [form, setForm] = useState({
    id: badge.id || '',
    label: badge.label || '',
    color: badge.color || '#000000',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">
          {form.id ? 'Edit Badge' : 'New Badge'}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="label"
            value={form.label}
            onChange={handleChange}
            placeholder="Badge Label (e.g. New)"
            className="border p-2 rounded"
          />

          <div>
            <label className="block text-sm mb-1">Color</label>
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-16 h-10 border rounded"
            />
          </div>

          <div className="flex gap-3 justify-end mt-4">
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
    </div>
  );
};

export default BadgeEditor;
