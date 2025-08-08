import React from 'react';

const BlogPreviewSection = ({ config }) => {
  const blogs = config?.items || [];

  if (!blogs.length) return null;

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={blog._id || index}
            className="bg-white p-6 border rounded-lg shadow hover:shadow-md transition"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="mb-4 w-full h-48 object-cover rounded"
              />
            )}
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <a
              href={`/blog/${blog.slug || blog._id}`}
              className="text-blue-600 hover:underline"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewSection;
