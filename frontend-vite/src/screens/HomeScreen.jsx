import log from '@/utils/logger';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCmsByRoute } from '@/redux/slices/cmsSlice';
import { fetchAllBlogs } from '@/redux/slices/blogSlice';
import { fetchAllProducts } from '@/redux/slices/productSlice';
import SectionRenderer from '@/components/SectionRenderer';

// Avoid allocating new arrays in selectors
const EMPTY = Object.freeze([]);

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Select per-slice to avoid returning fresh objects each render
  const sections = useSelector((state) => state.cms?.sections) || EMPTY;
  const blogList = useSelector((state) => state.blog?.blogList) || EMPTY;
  const productList =
    useSelector((state) => state.product?.productList) || EMPTY;

  useEffect(() => {
    dispatch(fetchCmsByRoute('/'));
    dispatch(fetchAllBlogs());
    dispatch(fetchAllProducts());
    log.debug('🧪 HomeScreen mounted');
  }, [dispatch]);

  return (
    <div className="space-y-10">
      <SectionRenderer
        sections={sections}
        blogs={blogList}
        products={productList}
      />
    </div>
  );
};

export default HomeScreen;
