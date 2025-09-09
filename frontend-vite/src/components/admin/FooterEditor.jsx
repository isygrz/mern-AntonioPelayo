import React, { useEffect, useState } from 'react';
import { useFooter } from '../../hooks/useFooter.ts';

const emptyRow = {
  name: '',
  url: '',
  external: false,
  enabled: true,
  order: 0,
};

export default function FooterEditor() {
  const { links } = useFooter();
  const [rows, setRows] = useState([emptyRow]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (links && links.length) setRows(links);
  }, [links]);

  const update = (idx, field, value) => {
    setRows((r) =>
      r.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => setRows((r) => [...r, { ...emptyRow, order: r.length }]);
  const removeRow = (idx) => setRows((r) => r.filter((_, i) => i !== idx));

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: rows }),
      });
      if (!res.ok)
        throw new Error((await res.json())?.message || 'Save failed');
      // Optional: toast here if you have a ToastProvider
    } catch (e) {
      setError(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Footer Links</h2>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-center">
          <input
            className="col-span-3 border p-2 rounded"
            placeholder="Name"
            value={row.name}
            onChange={(e) => update(i, 'name', e.target.value)}
          />
          <input
            className="col-span-5 border p-2 rounded"
            placeholder="/path or https://..."
            value={row.url}
            onChange={(e) => update(i, 'url', e.target.value)}
          />
          <label className="col-span-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!row.external}
              onChange={(e) => update(i, 'external', e.target.checked)}
            />
            External
          </label>
          <label className="col-span-1 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={row.enabled !== false}
              onChange={(e) => update(i, 'enabled', e.target.checked)}
            />
            Enabled
          </label>
          <input
            type="number"
            className="col-span-1 border p-2 rounded"
            value={row.order ?? 0}
            onChange={(e) => update(i, 'order', Number(e.target.value))}
          />
          <button
            onClick={() => removeRow(i)}
            className="col-span-12 sm:col-span-0 text-sm underline text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={addRow} className="px-3 py-2 rounded bg-gray-100">
          Add Link
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="px-3 py-2 rounded bg-black text-white"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}
