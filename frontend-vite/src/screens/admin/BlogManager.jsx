import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '@/redux/slices/blogSlice';

import ImageUploader from '@/components/admin/ImageUploader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogManager = () => {
  const dispatch = useDispatch();
  const { items: blogs, loading, error } = useSelector((state) => state.blogs);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setEditingPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    dispatch(updateBlog(editingPost));
    setEditingPost(null);
  };

  const handleCreate = () => dispatch(createBlog());
  const handleEdit = (post) => setEditingPost(post);
  const handleCancel = () => setEditingPost(null);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Manager</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + New Blog Post
        </button>
      </div>

      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {blogs.map((post) => (
          <div key={post._id} className="bg-white border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {post.published ? 'Published' : 'Draft'} • {post.author}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              className="text-sm mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: post.content?.slice(0, 150) + '…',
              }}
            />
          </div>
        ))}
      </div>

      {editingPost && (
        <div className="mt-10 border-t pt-6 space-y-3">
          <h2 className="text-xl font-semibold mb-4">Edit Blog Post</h2>
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
            value={editingPost.author}
            onChange={(e) => handleChange('author', e.target.value)}
            placeholder="Author"
            className="w-full border px-3 py-2 rounded"
          />
          <ImageUploader
            label="Blog Image"
            value={editingPost.image}
            onChange={(val) => handleChange('image', val)}
          />
          <ReactQuill
            value={editingPost.content}
            onChange={(val) => handleChange('content', val)}
            theme="snow"
            placeholder="Write your blog content here..."
            className="bg-white"
          />
          <label className="flex items-center gap-2 text-sm mt-2">
            <input
              type="checkbox"
              checked={editingPost.published}
              onChange={(e) => handleChange('published', e.target.checked)}
            />
            Publish this post
          </label>

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
