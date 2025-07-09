import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';
import ImageUploader from '../../components/admin/ImageUploader'; // ✅ Add this

const mockSections = [
  {
    id: '1',
    title: 'Summer Sale',
    subtitle: 'Up to 40% off rustic tiles',
    image: '/images/p1.jpeg',
    ctaText: 'Shop Now',
    ctaLink: '/',
    placement: '/',
    isActive: true,
  },
  {
    id: '2',
    title: 'Hand-Painted Tiles',
    subtitle: 'Artisanal pieces from Guadalajara',
    image: '/images/p2.jpeg',
    ctaText: 'Browse Collection',
    ctaLink: '/category/hand-painted',
    placement: '/',
    isActive: false,
  },
];

const HeroManager = () => {
  const [sections, setSections] = useState(mockSections);
  const [selected, setSelected] = useState(null);

  const handleSave = (section) => {
    if (section.id) {
      setSections((prev) =>
        prev.map((s) => (s.id === section.id ? section : s))
      );
    } else {
      setSections((prev) => [
        ...prev,
        { ...section, id: Date.now().toString() },
      ]);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
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
            <button
              onClick={() => setSelected(section)}
              className="absolute top-2 right-2 text-sm px-2 py-1 bg-gray-100 border rounded hover:bg-gray-200"
            >
              Edit
            </button>
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
