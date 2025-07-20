import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../redux/slices/productSlice';
import { fetchCmsByRoute } from '../redux/slices/cmsSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import SectionRenderer from '../components/SectionRenderer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const {
    items: products = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.products || {});

  const { sections } = useSelector((state) => state.cms);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCmsByRoute('/'));
  }, [dispatch]);

  useEffect(() => {
    if (sections?.length) {
      console.log('📦 CMS sections passed to renderer:', sections);
    } else {
      console.log('⚠️ No CMS sections to render');
    }
  }, [sections]);

  return (
    <div className="container mx-auto p-4">
      {/* ✅ CMS-Controlled Sections */}
      {sections?.length > 0 && <SectionRenderer sections={sections} />}

      <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
