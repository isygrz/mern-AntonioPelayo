import express from 'express';
import CMS from '../models/CMS.js';

const router = express.Router();

// @desc    Get CMS config by route (e.g., '/', '/about')
// @route   GET /api/cms?route=/
// @access  Public
router.get('/', async (req, res) => {
  const routePath = req.query.route || '/';
  try {
    const cmsDoc = await CMS.findOne({ route: routePath });

    if (!cmsDoc) {
      return res.status(404).json({
        message: `No CMS config found for route: ${routePath}`,
      });
    }

    res.json({ sections: cmsDoc.sections || [] });
  } catch (error) {
    console.error('❌ CMS GET error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update CMS layout (sections) for a route
// @route   PATCH /api/cms
// @access  Admin
router.patch('/', async (req, res) => {
  const { route = '/', sections = [] } = req.body;

  try {
    const cmsDoc = await CMS.findOne({ route });

    if (!cmsDoc) {
      return res
        .status(404)
        .json({ message: `CMS config not found for route: ${route}` });
    }

    cmsDoc.sections = sections;
    await cmsDoc.save();

    res.status(200).json({ message: '✅ CMS layout updated', sections });
  } catch (error) {
    console.error('❌ CMS PATCH error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
