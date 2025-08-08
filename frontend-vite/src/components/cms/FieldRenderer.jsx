import React, { useState } from 'react';
import axios from 'axios';

const FieldRenderer = ({ type, label, value, onChange }) => {
  const [preview, setPreview] = useState(value || '');
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onChange(data.imageUrl);
      setPreview(data.imageUrl);
      setError(null);
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('❌ Upload failed. Try again.');
    }
  };

  if (type === 'image') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </label>
        {preview && (
          <div className="mb-2">
            <img
              src={preview}
              alt="preview"
              className="h-20 rounded border border-gray-300 object-cover"
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100 focus:outline-none"
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md text-sm dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
      />
    </div>
  );
};

export default FieldRenderer;
