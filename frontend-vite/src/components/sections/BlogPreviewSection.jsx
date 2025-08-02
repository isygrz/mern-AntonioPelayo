import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../../redux/slices/blogSlice'; // ✅ correct thunk

const BlogPreviewSection = ({ config = {} }) => {
  const dispatch = useDispatch();
  const { title = 'Recent Blog Posts', maxItems = 3 } = config;
  const { blogs = [] } = useSelector((state) => state.blog || {});

  useEffect(() => {
    if (!blogs.length) {
      dispatch(fetchAllBlogs());
    }
  }, [dispatch, blogs]);

  const recent = blogs.slice(0, maxItems);

  if (!recent.length) return <p>No recent blogs available.</p>; // ✅ temporary fallback

  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {recent.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.snippet || blog.content?.slice(0, 100)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogPreviewSection;
