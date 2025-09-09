import React, { useEffect, useState } from 'react';

export default function EditProductModal({
  open,
  onClose,
  initial,
  onSubmit,
  saving,
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('active');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initial) {
      setName(initial.name || '');
      setPrice(String(initial.price ?? ''));
      setSlug(initial.slug || '');
      setStatus(initial.status || 'active');
      setImages(Array.isArray(initial.images) ? initial.images : []);
    } else {
      setName('');
      setPrice('');
      setSlug('');
      setStatus('active');
      setImages([]);
    }
  }, [initial, open]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      price: Number(price),
      slug: slug || undefined,
      status,
      images,
    });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-5">
        <div className="text-lg font-semibold mb-3">
          {initial?._id ? 'Edit Product' : 'New Product'}
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full border rounded p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full border rounded p-2"
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className="w-full border rounded p-2"
            placeholder="Slug (optional)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full border rounded p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">
              Images (comma-separated URLs)
            </label>
            <input
              className="w-full border rounded p-2"
              value={images.join(',')}
              onChange={(e) =>
                setImages(
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-3 py-2 rounded bg-black text-white"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
