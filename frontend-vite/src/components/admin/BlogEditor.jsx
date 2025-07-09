import { useState } from 'react';
import ImagePicker from './ImagePicker';
import MarkdownEditor from './MarkdownEditor';

const BlogEditor = ({ post, onSave, onCancel }) => {
  const [form, setForm] = useState({
    id: post.id || '',
    title: post.title || '',
    slug: post.slug || '',
    image: post.image || '',
    content: post.content || '',
  });

  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-3xl relative">
        <h2 className="text-lg font-bold mb-4">
          {form.id ? 'Edit Blog Post' : 'New Blog Post'}
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
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (e.g. tile-tips)"
            className="border p-2 rounded"
          />
          <div>
            <label className="block mb-1 text-sm">Featured Image</label>
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

          <MarkdownEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
          />

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

export default BlogEditor;
