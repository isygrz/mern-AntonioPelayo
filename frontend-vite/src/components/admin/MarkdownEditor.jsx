import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = ({ value, onChange }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center mb-1">
        <label className="font-semibold">Content</label>
        <button
          onClick={() => setShowPreview((p) => !p)}
          className="text-indigo-600 underline text-xs"
        >
          {showPreview ? 'Edit Markdown' : 'Preview'}
        </button>
      </div>

      {showPreview ? (
        <div className="border rounded p-3 bg-gray-50 prose max-w-none">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          rows="10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border p-2 rounded font-mono"
        />
      )}
    </div>
  );
};

export default MarkdownEditor;
