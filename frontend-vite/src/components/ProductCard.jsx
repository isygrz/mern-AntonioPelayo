import { Link } from 'react-router-dom';

export default function ProductCard({ product, inSampleCart, onToggleSample }) {
  return (
    <div className="flex flex-col border border-slate-gray rounded-lg shadow transition-transform duration-300 bg-white overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-blue-400 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.imageGallery}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Badge */}
        <span className="absolute top-2 left-2 bg-neon-green text-slate-gray text-xs px-2 py-0.5 rounded-full shadow font-slab">
          In Stock
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-grow">
        {/* Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-base font-slab text-slate-gray hover:text-deep-indigo transition-colors"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="text-sm text-slate-gray font-slab">
          ${product.pricePerBox.toFixed(2)}{' '}
          <span className="text-xs text-slate-veil font-slab">/box</span>
        </div>

        {/* Button */}
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
