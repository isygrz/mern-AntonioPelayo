import { Link } from 'react-router-dom';

const badgeStyles = {
  new: 'bg-sky-400 text-white',
  sale: 'bg-red-500 text-white',
  limited: 'bg-yellow-400 text-black',
};

export default function ProductCard({ product, inSampleCart, onToggleSample }) {
  const badge = product.badge?.toLowerCase();

  return (
    <div className="flex flex-col border border-slate-gray rounded-lg shadow transition-transform duration-300 bg-white overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-blue-400 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.imageGallery[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-2 left-2 text-xs px-2 py-1 rounded shadow font-slab ${
              badgeStyles[badge] || 'bg-gray-300 text-black'
            }`}
          >
            {badge.toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-grow">
        <Link
          to={`/product/${product.slug}`}
          className="text-base font-slab text-slate-gray hover:text-deep-indigo transition-colors"
        >
          {product.name}
        </Link>

        <div className="text-sm text-slate-gray font-slab">
          ${product.pricePerBox.toFixed(2)}{' '}
          <span className="text-xs text-slate-veil font-slab">/box</span>
        </div>

        <button
          onClick={() => onToggleSample(product.slug)}
          className={`mt-auto w-full py-2 text-sm font-semibold rounded border font-sans transition-colors ${
            inSampleCart
              ? 'bg-scarlet-red text-white hover:bg-[#5B130A]'
              : 'bg-periwinkle-blue text-white hover:bg-[#16045a]'
          }`}
        >
          {inSampleCart ? 'Sample in Cart' : 'Add Sample to Cart'}
        </button>
      </div>
    </div>
  );
}
