import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import cmsFieldConfig from '@/config/cmsSchema';

const AddEditSectionModal = ({ isOpen, onClose, section, onSave }) => {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (section?.settings) {
      setFormState(section.settings);
    }
  }, [section]);

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formState);
    toast.success('✅ Section updated');
    onClose();
  };

  const fields = cmsFieldConfig[section.type] || [];

  const renderInput = ({ key, type = 'text', options }) => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            value={formState[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="mt-1 w-full px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm"
          />
        );
      case 'toggle':
        return (
          <input
            type="checkbox"
            checked={!!formState[key]}
            onChange={(e) => handleChange(key, e.target.checked)}
            className="mt-1"
          />
        );
      case 'select':
        return (
          <select
            value={formState[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="mt-1 w-full px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm"
          >
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={formState[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="mt-1 w-full px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm"
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white dark:bg-neutral-800 p-6 rounded shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">
            ✏️ Edit <code>{section.type}</code> Section
          </Dialog.Title>

          {fields.length ? (
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium capitalize text-neutral-700 dark:text-neutral-200">
                    {field.label || field.key}
                  </label>
                  {renderInput(field)}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-neutral-500">
              No editable fields for this section type.
            </div>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-neutral-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddEditSectionModal;
