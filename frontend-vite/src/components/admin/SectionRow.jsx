import PropTypes from 'prop-types';

const SectionRow = ({ section, onToggle, onPlacementChange }) => {
  const { type, isActive, placement } = section;

  return (
    <div className="flex items-start gap-4 p-4 border rounded bg-white shadow">
      {/* 🖼️ Mock Preview */}
      <div className="w-32 h-24 bg-gray-100 border rounded flex items-center justify-center text-xs text-gray-500">
        {type === 'hero' && '🦸 Hero'}
        {type === 'promogrid' && '📦 PromoGrid'}
        {type === 'blogpreview' && '📝 BlogPreview'}
      </div>

      {/* 🧾 Section Details */}
      <div className="flex-1 space-y-1">
        <div className="text-sm font-semibold capitalize">{type} section</div>
        <div className="text-xs text-gray-600">
          Route placement:
          <input
            type="text"
            value={placement}
            onChange={(e) => onPlacementChange(e.target.value)}
            className="ml-2 px-2 py-0.5 text-sm border rounded w-40"
          />
        </div>
        <div className="text-xs text-gray-500">
          Active:{' '}
          <span className={isActive ? 'text-green-600' : 'text-red-600'}>
            {isActive ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      {/* 🎚️ Controls */}
      <div className="flex flex-col gap-2 items-end text-sm">
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded ${
            isActive ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>

        <button className="underline text-indigo-600 hover:text-indigo-800">
          Edit
        </button>
      </div>
    </div>
  );
};

SectionRow.propTypes = {
  section: PropTypes.shape({
    type: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    placement: PropTypes.string.isRequired,
    props: PropTypes.object,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onPlacementChange: PropTypes.func.isRequired,
};

export default SectionRow;
