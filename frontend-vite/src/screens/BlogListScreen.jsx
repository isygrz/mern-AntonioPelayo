import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';

const BlogListScreen = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Jalisco Tile Blog</h1>
      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <div key={post.slug} className="bg-white rounded shadow p-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-1">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {post.date} • by {post.author}
            </p>
            <p className="text-gray-700 mb-3">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-indigo-600 underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListScreen;
