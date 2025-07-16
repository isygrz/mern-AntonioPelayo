import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBadges,
  createBadge,
  updateBadge,
  deleteBadge,
} from '@/redux/slices/badgeSlice';

export default function BadgeManager() {
  const dispatch = useDispatch();
  const { items: badges, loading } = useSelector((state) => state.badges);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchBadges());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setEditing((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    dispatch(updateBadge({ id: editing._id, updates: editing }));
    setEditing(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Badge Manager</h1>
        <button
          onClick={() => dispatch(createBadge())}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Badge
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge._id}
            className={`p-4 border rounded shadow cursor-pointer ${
              editing?._id === badge._id ? 'border-blue-600' : ''
            }`}
            onClick={() => setEditing(badge)}
          >
            <div className="font-bold">{badge.name}</div>
            <div className="text-sm text-gray-500">{badge.description}</div>
            <div
              className="mt-2 px-2 py-1 inline-block rounded text-white text-xs"
              style={{ backgroundColor: badge.color }}
            >
              {badge.color}
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-6 border-t pt-4 space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            value={editing.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Color (hex or name)"
            value={editing.color}
            onChange={(e) => handleChange('color', e.target.value)}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={editing.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => dispatch(deleteBadge(editing._id))}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 text-gray-600 underline"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
