import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosInstance';
import { setQuery } from '@/redux/slices/searchSlice';

/**
 * SearchSuggest (v4)
 * - Live feedback + Enter to search
 * - Uses Redux products if available
 * - If Redux list is empty, lazily fetches /products once to power suggestions
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
  return [];
};

const normalize = (str) => (str || '').toString().toLowerCase().trim();

const SearchSuggest = ({
  placeholder = 'Search products...',
  minChars = 2,
  maxItems = 6,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxProducts = useSelector(pickProductsFromState) || [];
  const fetchedRef = useRef(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [query, setLocalQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // On first meaningful interaction, populate local cache if Redux list is empty
  useEffect(() => {
    if (reduxProducts.length > 0 || fetchedRef.current === true) return;
    const onFocusOrType = () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;
      axios
        .get('/products') // VITE_API_BASE-aware via axiosInstance
        .then(({ data }) => {
          const arr = Array.isArray(data) ? data : data?.items || [];
          setFetchedProducts(arr);
        })
        .catch(() => {
          // ignore silently; component will still work with no suggestions
        });
      document.removeEventListener('focusin', onFocusOrType);
      document.removeEventListener('keydown', onFocusOrType);
    };
    document.addEventListener('focusin', onFocusOrType);
    document.addEventListener('keydown', onFocusOrType);
    return () => {
      document.removeEventListener('focusin', onFocusOrType);
      document.removeEventListener('keydown', onFocusOrType);
    };
  }, [reduxProducts.length]);

  const allProducts =
    reduxProducts.length > 0 ? reduxProducts : fetchedProducts;

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q || q.length < minChars) return [];
    return allProducts
      .filter((p) => {
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
      })
      .slice(0, maxItems);
  }, [allProducts, query, minChars, maxItems]);

  useEffect(() => {
    const onClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const goToSearch = () => {
    const q = query.trim();
    if (!q) return;
    dispatch(setQuery(q));
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const showDropdown = open && query.length >= minChars;
  const imageOf = (item) =>
    Array.isArray(item?.image) ? item.image[0] : item?.image;

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setLocalQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              goToSearch();
            }
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search products"
        />
        {/* Live feedback pill */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          {query.length === 0 && <span>Type {minChars}+ chars</span>}
          {query.length > 0 && query.length < minChars && (
            <span>{minChars - query.length} more…</span>
          )}
          {query.length >= minChars && (
            <span>
              {results.length} match{results.length === 1 ? '' : 'es'}
            </span>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow">
          {results.length === 0 ? (
            <div className="px-3 py-3 text-sm text-gray-600">
              No matches. Press Enter for full results.
            </div>
          ) : (
            <ul className="max-h-80 overflow-auto">
              {results.map((item) => {
                const title = item?.name || item?.title || 'Untitled';
                const slug = item?.slug || item?.id || item?._id;
                return (
                  <li key={slug} className="border-b last:border-0">
                    <Link
                      to={`/product/${slug}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      {imageOf(item) && (
                        <img
                          src={imageOf(item)}
                          alt={title}
                          className="w-10 h-10 object-cover rounded"
                          loading="lazy"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm">{title}</span>
                        {item?.sku && (
                          <span className="text-xs text-gray-500">
                            {item.sku}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
              <li className="px-3 py-2">
                <button className="text-xs underline" onClick={goToSearch}>
                  See all results for "{query}"
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSuggest;
