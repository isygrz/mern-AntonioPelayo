import { useState } from 'react';
import SectionRow from '../../components/admin/SectionRow';

const initialSections = [
  {
    id: 's1',
    type: 'hero',
    placement: '/',
    isActive: true,
    order: 1,
    props: {
      title: 'Jalisco Hero',
      subtitle: 'Vibrant Handmade Tiles',
      image: '/images/p1.jpeg',
      ctaText: 'Shop Now',
      ctaLink: '/',
    },
  },
  {
    id: 's2',
    type: 'promogrid',
    placement: '/',
    isActive: true,
    order: 2,
    props: {
      heading: 'Popular Collections',
    },
  },
];

const sectionTypes = ['hero', 'promogrid', 'blogpreview'];

const SettingsManager = () => {
  const [sections, setSections] = useState(initialSections);

  const handleToggle = (id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleAdd = (type) => {
    const newSection = {
      id: `s${Date.now()}`,
      type,
      placement: '/',
      isActive: true,
      order: sections.length + 1,
      props: {},
    };
    setSections((prev) => [...prev, newSection]);
  };

  const handlePlacementChange = (id, value) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, placement: value } : s))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Site Layout Manager</h1>

      <div className="flex gap-2 mb-4">
        {sectionTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleAdd(type)}
            className="px-3 py-1 text-sm rounded bg-sky-600 text-white hover:bg-sky-700"
          >
            + Add {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <SectionRow
              key={section.id}
              section={section}
              onToggle={() => handleToggle(section.id)}
              onPlacementChange={(value) =>
                handlePlacementChange(section.id, value)
              }
            />
          ))}
      </div>
    </div>
  );
};

export default SettingsManager;
