import { useMemo, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setLastResultsCount } from '@/redux/slices/searchSlice';
import { fetchAllProducts } from '@/redux/slices/productSlice';

// Stable empty array to avoid new reference on each render
const EMPTY = Object.freeze([]);

/**
 * SearchResultsScreen (lint-fix)
 * - Removes logical fallback that confused deps: selector returns a STABLE EMPTY
 * - Keeps result filtering and optional auto-fetch behavior
 */
const pickProductsFromState = (state) => {
  const candidates = [
    state.products?.items,
    state.products?.list,
    state.products?.data,
    state.product?.items,
    state.product?.list,
    state.product?.data,
  ].filter(Boolean);
  if (candidates.length > 0) return candidates[0];
  if (state.products?.entities) return Object.values(state.products.entities);
  return EMPTY;
};

const useQueryString = () => new URLSearchParams(useLocation().search);
const normalize = (str) => (str || '').toString().toLowerCase().trim();

const SearchResultsScreen = () => {
  const dispatch = useDispatch();
  const qRaw = useQueryString().get('q');
  const q = normalize(qRaw);
  const allProducts = useSelector(pickProductsFromState);

  const results = useMemo(() => {
    if (!q) return EMPTY;
    return allProducts.filter((p) => {
      const name = normalize(p?.name || p?.title);
      const sku = normalize(p?.sku);
      const tags = Array.isArray(p?.tags)
        ? p.tags.map(normalize).join(' ')
        : '';
      const desc = normalize(p?.description);
      return (
        name.includes(q) ||
        sku.includes(q) ||
        tags.includes(q) ||
        desc.includes(q)
      );
    });
  }, [allProducts, q]);

  // Sync with optional search slice
  useEffect(() => {
    dispatch(setQuery(qRaw || ''));
    dispatch(setLastResultsCount(results.length));
  }, [dispatch, qRaw, results.length]);

  // 🔒 Optional hardening: auto-fetch products once if none are present
  const triedRef = useRef(false);
  useEffect(() => {
    if (triedRef.current) return;
    if (!allProducts || allProducts.length === 0) {
      triedRef.current = true;
      dispatch(fetchAllProducts());
    }
  }, [allProducts, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Search results</h1>

      {q ? (
        <p className="text-sm text-gray-600 mb-6">
          Showing results for "<span className="font-medium">{q}</span>"
        </p>
      ) : (
        <p className="text-sm text-gray-600 mb-6">
          Enter a search term to begin.
        </p>
      )}

      {q && results.length === 0 && (
        <div className="text-gray-600">No results found.</div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => {
            const title = item?.name || item?.title || 'Untitled';
            const slug = item?.slug || item?._id;
            const price = item?.price;
            const image = Array.isArray(item?.image)
              ? item.image[0]
              : item?.image;

            return (
              <Link
                key={slug}
                to={`/product/${slug}`}
                className="block border rounded hover:shadow transition-shadow"
              >
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-t"
                    loading="lazy"
                  />
                )}
                <div className="p-3">
                  <div className="text-sm font-medium line-clamp-2">
                    {title}
                  </div>
                  {price != null && (
                    <div className="text-sm text-gray-700 mt-1">${price}</div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResultsScreen;
