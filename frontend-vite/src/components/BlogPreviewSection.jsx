import { Link } from 'react-router-dom';

const BlogPreviewSection = ({ blogs = [] }) => {
  const previewPosts = blogs
    .filter((b) => b?.isActive !== false)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (!previewPosts || previewPosts.length === 0) {
    console.warn('⚠️ BlogPreviewSection: No valid blog posts to display');
    return null;
  }

  return (
    <div className="mb-8 px-4">
      <h3 className="text-xl font-bold mb-4">From the Blog</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {previewPosts.map((post) => (
          <div key={post._id} className="bg-white rounded shadow p-4">
            {post.image && (
              <img
                src={post.image}
                alt={post.title || 'Blog Cover'}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h4 className="text-sm font-semibold mb-1">{post.title}</h4>
            <p className="text-xs text-gray-600 mb-2">
              {new Date(post.createdAt).toLocaleDateString()} •{' '}
              {post.author || 'Admin'}
            </p>
            <p className="text-xs text-gray-700 line-clamp-3">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-indigo-600 text-xs mt-2 inline-block underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPreviewSection;
