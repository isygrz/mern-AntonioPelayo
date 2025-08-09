import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const BlogPostScreen = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(`/blogs/slug/${slug}`)
      .then(({ data }) => {
        if (isMounted) setPost(data);
      })
      .catch((err) => {
        if (isMounted)
          setError(err?.response?.data?.message || 'Failed to load blog');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) return <div className="p-6 text-gray-500">Loading post...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!post)
    return <div className="p-6 text-red-500">Blog post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/blog" className="text-indigo-600 underline text-sm mb-4 block">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.date || ''} {post.author ? `• by ${post.author}` : ''}
      </p>
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      ) : null}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: (post.content || '').replace(/\n/g, '<br/>'),
        }}
      />
    </div>
  );
};

export default BlogPostScreen;
