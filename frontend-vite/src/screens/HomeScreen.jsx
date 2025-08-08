import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCmsByRoute } from '@/redux/slices/cmsSlice';
import { fetchAllBlogs } from '@/redux/slices/blogSlice';
import { fetchAllProducts } from '@/redux/slices/productSlice';
import SectionRenderer from '@/components/SectionRenderer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const cmsState = useSelector((state) => state.cms);
  const { blogList = [] } = useSelector((state) => state.blog || {});
  const { productList = [] } = useSelector((state) => state.product || {});

  useEffect(() => {
    dispatch(fetchCmsByRoute('/'));
    dispatch(fetchAllBlogs());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log('🧪 HomeScreen mounted');
  console.log('🧪 Full CMS Redux state:', cmsState);
  console.log(
    '🧪 HomeScreen CMS sections from Redux:',
    cmsState?.sections || []
  );

  return (
    <div className="space-y-10">
      <SectionRenderer
        sections={cmsState?.sections || []}
        blogs={blogList}
        products={productList}
      />
    </div>
  );
};

export default HomeScreen;
