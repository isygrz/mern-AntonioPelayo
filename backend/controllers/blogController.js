import Blog from '../models/Blog.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc Fetch all blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc Fetch single blog by slug
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc Create a new blog
export const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    title: 'New Post',
    slug: `new-${Date.now()}`,
    image: '',
    content: '',
    published: false,
    author: req.user?.name || 'Admin',
  });

  const created = await blog.save();
  res.status(201).json(created);
});

// @desc Update blog
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const { title, slug, image, content, published } = req.body;

  blog.title = title ?? blog.title;
  blog.slug = slug ?? blog.slug;
  blog.image = image ?? blog.image;
  blog.content = content ?? blog.content;
  blog.published = published ?? blog.published;

  const updated = await blog.save();
  res.json(updated);
});

// @desc Delete blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  await blog.deleteOne();
  res.json({ message: 'Blog deleted' });
});
