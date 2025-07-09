import { useState } from 'react';
import blogPosts from '../../data/blogData';
import ImageUploader from '../../components/admin/ImageUploader';
import ReactQuill from 'react-quill'; // ✅ NEW
import 'react-quill/dist/quill.snow.css'; // ✅ STYLES

const BlogManager = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => setEditingPost(post);
  const handleCancel = () => setEditingPost(null);

  const handleChange = (field, value) => {
    setEditingPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setPosts((prev) =>
      prev.map((p) => (p.id === editingPost.id ? editingPost : p))
    );
    setEditingPost(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Manager</h1>

      {/* Post List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {post.date} • {post.author}
                </p>
              </div>
              <button
                onClick={() => handleEdit(post)}
                className="text-indigo-600 underline text-sm"
              >
                Edit
              </button>
            </div>
            <p
              className="text-sm mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editingPost && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Blog Post</h2>
          <div className="space-y-3">
            <input
              value={editingPost.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              value={editingPost.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="Slug"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              value={editingPost.date}
              onChange={(e) => handleChange('date', e.target.value)}
              type="date"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              value={editingPost.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="Author"
              className="w-full border px-3 py-2 rounded"
            />

            {/* 🖼️ Image Upload */}
            <ImageUploader
              label="Blog Image"
              value={editingPost.image}
              onChange={(val) => handleChange('image', val)}
            />

            {/* ✏️ Excerpt */}
            <textarea
              value={editingPost.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Short Excerpt"
              className="w-full border px-3 py-2 rounded h-20"
            />

            {/* ✍️ WYSIWYG Content Editor */}
            <ReactQuill
              value={editingPost.content}
              onChange={(val) => handleChange('content', val)}
              theme="snow"
              placeholder="Write your blog content here..."
              className="bg-white"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button onClick={handleCancel} className="text-gray-600 underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
