import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log('Products from Redux:', products); // Debug output

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-8">Error: {error}</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h3 className="text-xl font-bold font-slab text-slate-gray mb-6 text-left">
        Featured Products
      </h3>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-gray">No Products Found</p>
      )}
    </div>
  );
};

export default HomeScreen;
