import { useState } from 'react';
import BadgeEditor from '../../components/admin/BadgeEditor';

const initialBadges = [
  { id: '1', label: 'New', color: '#22C55E' },
  { id: '2', label: 'Online Only', color: '#3B82F6' },
  { id: '3', label: 'Limited', color: '#EAB308' },
];

const BadgeManager = () => {
  const [badges, setBadges] = useState(initialBadges);
  const [selected, setSelected] = useState(null);

  const handleSave = (badge) => {
    if (badge.id) {
      setBadges((prev) => prev.map((b) => (b.id === badge.id ? badge : b)));
    } else {
      setBadges((prev) => [...prev, { ...badge, id: Date.now().toString() }]);
    }
    setSelected(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Badge Manager</h1>
        <button
          onClick={() => setSelected({})}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + New Badge
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="bg-white p-4 rounded shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-medium px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: badge.color }}
              >
                {badge.label}
              </span>
              <span className="text-xs text-gray-500">{badge.color}</span>
            </div>
            <button
              onClick={() => setSelected(badge)}
              className="text-sm text-gray-500 underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {selected !== null && (
        <BadgeEditor
          badge={selected}
          onSave={handleSave}
          onCancel={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default BadgeManager;
