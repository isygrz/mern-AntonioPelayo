import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/slices/productSlice'; // ✅ confirmed

const FeaturedProductSection = ({ config = {} }) => {
  const dispatch = useDispatch();
  const { title = 'Featured Products', maxItems = 4 } = config;
  const { products = [] } = useSelector((state) => state.product || {});

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products]);

  const featured = products.slice(0, maxItems);

  if (!featured.length) return <p>No featured products available.</p>; // ✅ temporary fallback

  return (
    <section>
      <h2>{title}</h2>
      <div className="featured-product-grid">
        {featured.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductSection;
