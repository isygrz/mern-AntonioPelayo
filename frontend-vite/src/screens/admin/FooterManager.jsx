import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFooter,
  updateFooter,
  selectFooter,
  selectFooterLoading,
  selectFooterError,
  selectFooterSaving,
} from '../../redux/slices/footerSlice';
import { toast } from 'react-hot-toast';

/**
 * Admin Footer Manager
 * - Loads current footer (works with either {links} or legacy {sections})
 * - Simple rows editor: label + url
 * - Save dispatches updateFooter({ links })
 * - Shows loading/empty/error states + toasts
 */
export default function FooterManager() {
  const dispatch = useDispatch();
  const footer = useSelector(selectFooter);
  const loading = useSelector(selectFooterLoading);
  const error = useSelector(selectFooterError);
  const saving = useSelector(selectFooterSaving);

  // Normalize inbound data to an array of {label, url}
  const initialRows = useMemo(() => {
    const links = Array.isArray(footer?.links) ? footer.links : null;
    const sections = Array.isArray(footer?.sections) ? footer.sections : null;
    const list = links || sections || [];
    return list.map((l) => ({
      label: (l?.label ?? l?.title ?? '').toString(),
      url: (l?.url ?? l?.href ?? '').toString(),
    }));
  }, [footer]);

  const [rows, setRows] = useState([{ label: '', url: '' }]);

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch]);

  useEffect(() => {
    if (initialRows.length) setRows(initialRows);
  }, [initialRows]);

  const onChange = (idx, field, value) => {
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => setRows((prev) => [...prev, { label: '', url: '' }]);
  const removeRow = (idx) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const onSave = async () => {
    const cleaned = rows
      .map((r) => ({
        label: (r.label || '').trim(),
        url: (r.url || '').trim(),
      }))
      .filter((r) => r.label.length > 0);

    try {
      await dispatch(updateFooter({ links: cleaned })).unwrap();
      toast.success('Footer saved');
      dispatch(fetchFooter());
    } catch (e) {
      toast.error(typeof e === 'string' ? e : 'Failed to save footer');
    }
  };

  if (loading && !footer) {
    return <div className="p-4">Loading footer…</div>;
  }

  if (error && !footer) {
    return <div className="p-4 text-red-600">Failed to load footer.</div>;
  }

  return (
    <div className="max-w-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Footer Links</h1>
        {footer?.updatedAt && (
          <span className="text-sm text-gray-500">
            Last updated: {new Date(footer.updatedAt).toLocaleString()}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <input
              className="col-span-4 border rounded px-2 py-1"
              placeholder="Label (e.g., About Us)"
              value={row.label}
              onChange={(e) => onChange(idx, 'label', e.target.value)}
            />
            <input
              className="col-span-7 border rounded px-2 py-1"
              placeholder="URL (e.g., /about-us or https://…)"
              value={row.url}
              onChange={(e) => onChange(idx, 'url', e.target.value)}
            />
            <button
              type="button"
              className="col-span-1 border rounded px-2 py-1 hover:bg-gray-50"
              onClick={() => removeRow(idx)}
              title="Remove row"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-2">
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
