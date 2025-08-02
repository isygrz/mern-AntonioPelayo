import CMS from '../models/Cms.model.js';
import Product from '../models/Product.js';
import Blog from '../models/Blog.js';
import asyncHandler from '../middleware/asyncHandler.js';

/**
 * @desc    Get CMS layout by route (with dynamic item injection)
 * @route   GET /api/cms?route=/
 * @access  Public
 */
export const getCmsByRoute = asyncHandler(async (req, res) => {
  const { route } = req.query;

  if (!route) {
    return res
      .status(400)
      .json({ message: 'Missing required query param: route' });
  }

  const entry = await CMS.findOne({ route });

  if (!entry) {
    return res.status(200).json({ sections: [] }); // safe fallback
  }

  const sections = await Promise.all(
    entry.sections.map(async (section) => {
      if (!section.enabled) return section;

      // 💠 Dynamically populate products for featuredProduct
      if (section.type === 'featuredProduct') {
        const maxItems = section.config?.maxItems || 6;
        const products = await Product.find({}).limit(maxItems);
        return {
          ...section,
          config: {
            ...section.config,
            items: products,
          },
        };
      }

      // 📝 Dynamically populate blogs for blogPreview
      if (section.type === 'blogPreview') {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(3);
        return {
          ...section,
          config: {
            ...section.config,
            items: blogs,
          },
        };
      }

      return section;
    })
  );

  res.status(200).json({ sections });
});

/**
 * @desc    Update CMS layout for a route
 * @route   PATCH /api/cms
 * @access  Private/Admin
 */
export const updateCmsLayout = asyncHandler(async (req, res) => {
  const { route, sections } = req.body;

  if (!route || !Array.isArray(sections)) {
    return res
      .status(400)
      .json({ message: 'Invalid payload: route and sections required' });
  }

  const updated = await CMS.findOneAndUpdate(
    { route },
    { $set: { sections } },
    { new: true, upsert: false }
  );

  if (!updated) {
    return res
      .status(404)
      .json({ message: `CMS config for ${route} not found` });
  }

  res.status(200).json({ sections: updated.sections });
});
