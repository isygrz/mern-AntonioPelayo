import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/slices/blogSlice';
import { Link } from 'react-router-dom';

const BlogListScreen = () => {
  const dispatch = useDispatch();
  const { items: blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Jalisco Tile Blog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="grid gap-8">
          {blogs.map((post) => (
            <div key={post._id} className="bg-white rounded shadow p-6">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-bold mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.createdAt).toLocaleDateString()} •{' '}
                {post.author || 'Admin'}
              </p>
              <p className="text-gray-700 mb-3">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-indigo-600 underline text-sm"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListScreen;
