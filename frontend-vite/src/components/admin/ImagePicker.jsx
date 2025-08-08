const mockImages = [
  'http://localhost:5000/uploads/p1.jpeg',
  'http://localhost:5000/uploads/p2.jpeg',
  'http://localhost:5000/uploads/p3.jpeg',
  'http://localhost:5000/uploads/p4.jpeg',
  'http://localhost:5000/uploads/p5.jpeg',
];

const ImagePicker = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Select Image</h2>
        <div className="grid grid-cols-3 gap-3">
          {mockImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Option ${i}`}
              className="w-full h-20 object-cover cursor-pointer border rounded hover:ring-2 ring-indigo-600"
              onClick={() => onSelect(img)}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 block ml-auto text-sm text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
