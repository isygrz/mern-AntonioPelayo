import express from 'express';
import CMS from '../models/CMS.js';

const router = express.Router();

// @desc    Get CMS config by route (e.g., '/', '/about', etc.)
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

    // ✅ Return in expected shape for frontend thunk
    res.json({ sections: cmsDoc.sections || [] });
  } catch (error) {
    console.error('❌ CMS route error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
