import { useParams, Link } from 'react-router-dom';
import blogPosts from '../data/blogData';

const BlogPostScreen = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-6 text-red-500">Blog post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/blog" className="text-indigo-600 underline text-sm mb-4 block">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.date} • by {post.author}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(/\n/g, '<br/>'),
        }}
      />
    </div>
  );
};

export default BlogPostScreen;
