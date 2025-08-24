import Blog from '../models/Blog.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { createSlug, ensureUniqueSlug } from '../utils/slug.js';

// @desc Fetch all blogs
export const getAllBlogs = asyncHandler(async (_req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc Fetch single blog by slug
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.json(blog);
});

// @desc Create a new blog
export const createBlog = asyncHandler(async (req, res) => {
  const title = req.body?.title || 'New Post';
  const baseSlug = createSlug(req.body?.slug || title);
  const uniqueSlug = await ensureUniqueSlug(Blog, baseSlug);

  const blog = new Blog({
    title,
    slug: uniqueSlug,
    image: req.body?.image || '',
    content: req.body?.content || '',
    excerpt: req.body?.excerpt || '',
    tags: req.body?.tags || [],
    published: !!req.body?.published,
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

  const prevTitle = blog.title;
  const nextTitle = req.body?.title ?? blog.title;
  const incomingSlug = req.body?.slug;

  blog.title = nextTitle;
  blog.image = req.body?.image ?? blog.image;
  blog.content = req.body?.content ?? blog.content;
  blog.excerpt = req.body?.excerpt ?? blog.excerpt;
  blog.tags = req.body?.tags ?? blog.tags;
  blog.published =
    typeof req.body?.published !== 'undefined'
      ? !!req.body.published
      : blog.published;

  if (incomingSlug) {
    const base = createSlug(incomingSlug);
    blog.slug = await ensureUniqueSlug(Blog, base, blog._id);
  } else if (!blog.slug || nextTitle !== prevTitle) {
    const base = createSlug(nextTitle);
    blog.slug = await ensureUniqueSlug(Blog, base, blog._id);
  }

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
