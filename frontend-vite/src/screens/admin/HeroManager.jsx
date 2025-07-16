import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionEditor from '@/components/admin/SectionEditor';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  fetchHeroes,
  createHero,
  updateHero,
  deleteHero,
} from '@/redux/slices/heroSlice';

const HeroManager = () => {
  const dispatch = useDispatch();
  const { items: heroes, loading } = useSelector((state) => state.heroes);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  const handleSave = (section) => {
    if (section._id) {
      dispatch(updateHero({ id: section._id, updates: section }));
    } else {
      dispatch(createHero()).then((res) => {
        const created = res.payload;
        dispatch(updateHero({ id: created._id, updates: section }));
      });
    }
    setSelected(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Hero Sections</h1>
        <button
          onClick={() => setSelected({})}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + New Section
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroes.map((section) => (
          <div
            key={section._id}
            className="bg-white rounded shadow p-4 relative"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="text-sm text-gray-600">{section.subtitle}</p>
            <p className="text-sm text-gray-500 mt-1">
              Placement: {section.placement}
            </p>
            <div className="text-sm text-green-600 mt-1">
              {section.isActive ? 'Active' : 'Inactive'}
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => setSelected(section)}
                className="text-sm px-2 py-1 bg-gray-100 border rounded hover:bg-gray-200"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteHero(section._id))}
                className="text-sm px-2 py-1 bg-red-100 border border-red-400 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected !== null && (
        <SectionEditor
          section={selected}
          onSave={handleSave}
          onCancel={() => setSelected(null)}
          ImageField={({ value, onChange }) => (
            <ImageUploader
              label="Hero Image"
              value={value}
              onChange={onChange}
            />
          )}
        />
      )}
    </div>
  );
};

export default HeroManager;
