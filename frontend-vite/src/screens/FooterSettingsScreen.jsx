import React, { useEffect, useState } from 'react';
import { fetchFooter, updateFooterLinks } from '@/api/footerApi';

/**
 * FooterSettingsScreen (lint-fix)
 * - No unused handler params
 * - Defensive defaults
 * - Minimal UX polish on error/saving states
 */
export default function FooterSettingsScreen() {
  const [links, setLinks] = useState([{ label: '', url: '' }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchFooter();
        if (!ignore) {
          setLinks(data?.links?.length ? data.links : [{ label: '', url: '' }]);
          setUpdatedAt(data?.updatedAt || '');
        }
      } catch {
        if (!ignore) setError('Failed to load footer');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const onChange = (idx, field, value) => {
    setLinks((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, [field]: value } : l))
    );
  };

  const addRow = () => setLinks((prev) => [...prev, { label: '', url: '' }]);
  const removeRow = (idx) =>
    setLinks((prev) => prev.filter((_, i) => i !== idx));

  const onSave = async () => {
    try {
      setSaving(true);
      setError('');
      const cleaned = links
        .map((l) => ({
          label: (l.label || '').trim(),
          url: (l.url || '').trim(),
        }))
        .filter((l) => l.label.length > 0);
      const data = await updateFooterLinks(cleaned);
      setLinks(data.links || []);
      setUpdatedAt(data.updatedAt || '');
      alert('Saved footer links.');
    } catch {
      setError('Failed to save footer');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading footer…</div>;
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Footer Links</h1>
      {updatedAt && (
        <p className="text-sm text-gray-500 mb-4">
          Last updated: {new Date(updatedAt).toLocaleString()}
        </p>
      )}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="space-y-3">
        {links.map((l, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <input
              className="col-span-4 border rounded px-2 py-1"
              placeholder="Label"
              value={l.label || ''}
              onChange={(e) => onChange(idx, 'label', e.target.value)}
            />
            <input
              className="col-span-7 border rounded px-2 py-1"
              placeholder="URL (/products or https://…)"
              value={l.url || ''}
              onChange={(e) => onChange(idx, 'url', e.target.value)}
            />
            <button
              type="button"
              className="col-span-1 border rounded px-2 py-1 hover:bg-gray-50"
              onClick={() => removeRow(idx)}
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="border rounded px-3 py-1"
          onClick={addRow}
        >
          + Add link
        </button>
        <button
          type="button"
          className="border rounded px-3 py-1 bg-black text-white disabled:opacity-60"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}
