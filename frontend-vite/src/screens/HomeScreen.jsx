import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCmsByRoute } from '@/redux/slices/cmsSlice';
import { fetchAllBlogs } from '@/redux/slices/blogSlice';
import SectionRenderer from '@/components/SectionRenderer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { sections = [] } = useSelector((state) => state.cms || {});
  const { blogList = [] } = useSelector((state) => state.blog || {});

  useEffect(() => {
    dispatch(fetchCmsByRoute('/'));
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <div className="space-y-10">
      <SectionRenderer sections={sections} blogs={blogList} />
    </div>
  );
};

export default HomeScreen;
