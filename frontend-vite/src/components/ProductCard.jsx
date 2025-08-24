import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/ToastProvider.jsx';
import { addToCart, removeFromCart } from '@/redux/slices/cartSlice';

/**
 * ProductCard
 * - Preserves existing Sample Cart UX via inSampleCart/onToggleSample props
 * - Adds standard cart actions with success/error toasts
 * - Brief 'blink' ring on successful add
 */

const imageOf = (p) => p?.imageGallery || p?.image || null;

export default function ProductCard({ product, inSampleCart, onToggleSample }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const cartItems = useSelector(
    (s) => s.cart?.items || s.cart?.cartItems || []
  );

  const inCart = useMemo(
    () =>
      cartItems.some(
        (ci) =>
          ci?.product === product?._id ||
          ci?._id === product?._id ||
          ci?.slug === product?.slug
      ),
    [cartItems, product?._id, product?.slug]
  );

  const [busy, setBusy] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!blink) return;
    const t = setTimeout(() => setBlink(false), 900);
    return () => clearTimeout(t);
  }, [blink]);

  const perBox = product?.pricing?.perBox;
  const hasSampleSupport = typeof onToggleSample === 'function';

  const onAdd = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await dispatch(addToCart({ productId: product._id, qty: 1 })).unwrap?.();
      toast.success(
        `Added “${product?.name || product?.title || 'Item'}” to cart`
      );
      setBlink(true);
    } catch (err) {
      toast.error(err?.message || 'Failed to add to cart');
    } finally {
      setBusy(false);
    }
  };

  const onRemove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await dispatch(removeFromCart({ productId: product._id })).unwrap?.();
      toast.info(
        `Removed “${product?.name || product?.title || 'Item'}” from cart`
      );
    } catch (err) {
      toast.error(err?.message || 'Failed to remove from cart');
    } finally {
      setBusy(false);
    }
  };

  const btnBase =
    'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition';
  const addBtn =
    'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed';
  const removeBtn =
    'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <div
      className={`flex flex-col border border-slate-gray rounded-lg shadow transition-transform duration-300 bg-white overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-blue-400 hover:scale-[1.02] ${
        blink ? 'ring-2 ring-green-400' : ''
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={imageOf(product) || 'http://localhost:5000/uploads/p5.jpeg'}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </Link>

        <span className="absolute top-2 left-2 bg-neon-green text-slate-gray text-xs px-2 py-0.5 rounded-full shadow font-slab">
          In Stock
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-grow">
        <Link
          to={`/product/${product.slug}`}
          className="text-base font-slab text-slate-gray hover:text-deep-indigo transition-colors"
        >
          {product.name || 'Unnamed Product'}
        </Link>

        <div className="text-sm text-slate-gray font-slab">
          {typeof perBox === 'number'
            ? `$${perBox.toFixed(2)}`
            : 'Price Unavailable'}
          <span className="text-xs text-slate-veil font-slab"> /box</span>
        </div>

        {/* Cart actions */}
        <div className="mt-2 flex items-center gap-2">
          {!inCart ? (
            <button
              onClick={onAdd}
              className={`${btnBase} ${addBtn}`}
              disabled={busy}
            >
              {busy ? 'Adding…' : 'Add to Cart'}
            </button>
          ) : (
            <>
              <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                In cart
              </span>
              <button
                onClick={onRemove}
                className={`${btnBase} ${removeBtn}`}
                disabled={busy}
              >
                {busy ? 'Removing…' : 'Remove'}
              </button>
            </>
          )}
        </div>

        {/* Sample button (preserved behavior) */}
        {hasSampleSupport && (
          <button
            onClick={() => onToggleSample(product.slug)}
            className={`mt-2 w-full py-2 text-sm font-semibold rounded border font-sans transition-colors ${
              inSampleCart
                ? 'bg-scarlet-red text-white hover:bg-[#5B130A]'
                : 'bg-periwinkle-blue text-white hover:bg-[#16045a]'
            }`}
          >
            {inSampleCart ? 'Sample in Cart' : 'Add Sample to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}
