import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import cmsFieldConfig from '@/config/cmsSchema';
import FieldRenderer from '../cms/FieldRenderer'; // Ensure this exists

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
                  <FieldRenderer
                    type={field.type}
                    value={formState[field.key] || ''}
                    onChange={(val) => handleChange(field.key, val)}
                  />
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
