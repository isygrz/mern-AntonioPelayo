import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../redux/slices/blogSlice';
import { Link } from 'react-router-dom';

const BlogListScreen = () => {
  const dispatch = useDispatch();
  const {
    items: blogs = [],
    loading,
    error,
    fetched, // optional: set this in your slice after a successful load
  } = useSelector((state) => state.blogs || {});

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(fetchAllBlogs());
    }
  }, [dispatch, fetched, loading]);

  if (loading) return <div className="p-6">Loading blogs…</div>;

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-3">Error: {String(error)}</div>
        <button
          onClick={() => dispatch(fetchAllBlogs())}
          className="px-3 py-2 rounded bg-indigo-600 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Jalisco Tile Blog</h1>

      {blogs.length === 0 ? (
        <div className="text-gray-600">No blog posts yet.</div>
      ) : (
        <div className="grid gap-8">
          {blogs.map((post, idx) => {
            const key = post?._id || post?.slug || idx;
            const href = post?.slug ? `/blog/${post.slug}` : '#';
            return (
              <div key={key} className="bg-white rounded shadow p-6">
                {post?.image ? (
                  <img
                    src={post.image}
                    alt={post?.title || 'Blog image'}
                    className="w-full h-48 object-cover rounded mb-4"
                    loading="lazy"
                  />
                ) : null}
                <h2 className="text-xl font-bold mb-1">
                  {post?.title || 'Untitled'}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {post?.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ''}
                  {post?.author ? ` • ${post.author}` : ''}
                </p>
                {post?.excerpt ? (
                  <p className="text-gray-700 mb-3">{post.excerpt}</p>
                ) : null}
                <Link
                  to={href}
                  className={`text-indigo-600 underline text-sm ${
                    href === '#' ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  Read More →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogListScreen;
