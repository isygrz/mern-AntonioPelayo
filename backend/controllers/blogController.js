import Blog from '../models/Blog.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { createSlug, ensureUniqueSlug } from '../utils/slug.js';

/**
 * @desc Fetch all blogs
 * @route GET /api/blogs
 * @access Public
 */
export const getAllBlogs = asyncHandler(async (_req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

/**
 * @desc Fetch single blog by slug
 * @route GET /api/blogs/slug/:slug
 * @access Public
 */
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const slug = String(req.params.slug || '').trim();
  const blog = await Blog.findOne({ slug });
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  res.json(blog);
});

/**
 * @desc Create a new blog
 * @route POST /api/blogs
 * @access Admin
 */
export const createBlog = asyncHandler(async (req, res) => {
  const title = String(req.body?.title || 'New Post').trim();
  const incomingSlug = req.body?.slug ? String(req.body.slug).trim() : null;
  const baseSlug = createSlug(incomingSlug || title);
  const uniqueSlug = await ensureUniqueSlug(Blog, baseSlug);

  const blog = new Blog({
    title,
    slug: uniqueSlug,
    image: req.body?.image || '',
    content: req.body?.content || '',
    excerpt: req.body?.excerpt || '',
    tags: Array.isArray(req.body?.tags)
      ? req.body.tags
      : req.body?.tags
      ? [req.body.tags]
      : [],
    published: !!req.body?.published,
    author: req.user?.name || 'Admin',
  });

  const created = await blog.save();
  res.status(201).json(created);
});

/**
 * @desc Update blog
 * @route PUT /api/blogs/:id
 * @access Admin
 */
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const prevTitle = blog.title;
  const nextTitle =
    typeof req.body?.title === 'string' ? req.body.title.trim() : blog.title;
  const incomingSlugRaw =
    typeof req.body?.slug === 'string' ? req.body.slug.trim() : undefined;

  blog.title = nextTitle;
  blog.image = req.body?.image ?? blog.image;
  blog.content = req.body?.content ?? blog.content;
  blog.excerpt = req.body?.excerpt ?? blog.excerpt;
  blog.tags = Array.isArray(req.body?.tags)
    ? req.body.tags
    : req.body?.tags
    ? [req.body.tags]
    : blog.tags;
  if (typeof req.body?.published !== 'undefined') {
    blog.published = !!req.body.published;
  }

  // Slug rules mirror product controller
  if (incomingSlugRaw !== undefined) {
    if (incomingSlugRaw === '') {
      const base = createSlug(nextTitle);
      blog.slug = await ensureUniqueSlug(Blog, base, blog._id);
    } else {
      const base = createSlug(incomingSlugRaw);
      blog.slug = await ensureUniqueSlug(Blog, base, blog._id);
    }
  } else if (!blog.slug || nextTitle !== prevTitle) {
    const base = createSlug(nextTitle);
    blog.slug = await ensureUniqueSlug(Blog, base, blog._id);
  }

  const updated = await blog.save();
  res.json(updated);
});

/**
 * @desc Delete blog
 * @route DELETE /api/blogs/:id
 * @access Admin
 */
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }
  await blog.deleteOne();
  res.json({ message: 'Blog deleted' });
});
