const SectionRenderer = ({ sections }) => {
  return (
    <>
      {sections
        .filter((s) => s.isActive && s.placement === '/')
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          switch (section.type) {
            case 'hero':
              return (
                <div key={section.id} className="relative overflow-hidden mb-8">
                  <img
                    src={section.props.image}
                    alt={section.props.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">
                      {section.props.title}
                    </h2>
                    <p className="text-lg mb-4">{section.props.subtitle}</p>
                    <a
                      href={section.props.ctaLink}
                      className="bg-white text-black px-4 py-2 rounded font-semibold"
                    >
                      {section.props.ctaText}
                    </a>
                  </div>
                </div>
              );

            case 'promogrid':
              return (
                <div key={section.id} className="mb-8 px-4">
                  <h3 className="text-xl font-bold mb-4">
                    {section.props.heading || 'Promo Grid'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="h-32 bg-blue-100 rounded flex items-center justify-center text-sm text-blue-900">
                      Promo A
                    </div>
                    <div className="h-32 bg-green-100 rounded flex items-center justify-center text-sm text-green-900">
                      Promo B
                    </div>
                    <div className="h-32 bg-yellow-100 rounded flex items-center justify-center text-sm text-yellow-900">
                      Promo C
                    </div>
                    <div className="h-32 bg-pink-100 rounded flex items-center justify-center text-sm text-pink-900">
                      Promo D
                    </div>
                  </div>
                </div>
              );

            case 'blogpreview':
              return (
                <div key={section.id} className="mb-8 px-4">
                  <h3 className="text-xl font-bold mb-4">From the Blog</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-white rounded shadow p-4">
                      <h4 className="text-sm font-semibold">Post Title</h4>
                      <p className="text-xs text-gray-600">
                        Excerpt preview goes here...
                      </p>
                    </div>
                    <div className="bg-white rounded shadow p-4">
                      <h4 className="text-sm font-semibold">Another Post</h4>
                      <p className="text-xs text-gray-600">
                        Excerpt preview goes here...
                      </p>
                    </div>
                    <div className="bg-white rounded shadow p-4">
                      <h4 className="text-sm font-semibold">Latest News</h4>
                      <p className="text-xs text-gray-600">
                        Excerpt preview goes here...
                      </p>
                    </div>
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
    </>
  );
};

export default SectionRenderer;
