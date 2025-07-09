import { useRef, useState } from 'react';

const ImageUploader = ({ label, value, onChange }) => {
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onChange(reader.result); // base64 or local preview URL
    };
    reader.readAsDataURL(file);
  };

  const handleUrlInput = (e) => {
    setPreview(e.target.value);
    onChange(e.target.value); // URL input
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm text-gray-700">{label}</label>

      {/* 📁 Local File Upload */}
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="block text-sm text-gray-500 file:mr-3 file:py-1 file:px-4 file:rounded file:border file:border-gray-300 file:bg-white file:text-sm"
        />
      </div>

      {/* 🌐 Image URL Input */}
      <input
        type="text"
        placeholder="Paste image URL or upload above"
        value={preview}
        onChange={handleUrlInput}
        className="w-full border rounded px-3 py-2 text-sm"
      />

      {/* 🖼️ Live Preview */}
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-xs rounded border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
