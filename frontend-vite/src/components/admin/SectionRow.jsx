import React from 'react';

const SectionRow = ({
  index,
  section,
  onFieldChange,
  onReorder,
  onDeleteSection,
  onEditSettings,
}) => {
  const handleToggleEnabled = () => {
    onFieldChange(index, 'enabled', !section.enabled);
  };

  const handleMoveUp = () => {
    if (index > 0) onReorder(index, index - 1);
  };

  const handleMoveDown = () => {
    onReorder(index, index + 1);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded px-4 py-2 mb-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium capitalize">
            [{index + 1}] {section.type}
          </div>
          <div className="text-xs text-neutral-500">ID: {section.id}</div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={handleMoveUp}
            className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-neutral-700 rounded"
          >
            ⬆
          </button>
          <button
            onClick={handleMoveDown}
            className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-neutral-700 rounded"
          >
            ⬇
          </button>

          <button
            onClick={handleToggleEnabled}
            className={`px-2 py-0.5 text-xs rounded ${
              section.enabled
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            {section.enabled ? 'Enabled' : 'Disabled'}
          </button>

          <button
            onClick={() => onEditSettings(index)}
            className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDeleteSection(index)}
            className="px-2 py-0.5 text-xs bg-red-600 text-white rounded"
          >
            ✖ Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionRow;
