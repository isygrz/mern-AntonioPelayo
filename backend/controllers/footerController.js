import asyncHandler from '../middleware/asyncHandler.js';
import Footer from '../models/Footer.js';

// @desc Get footer content
// @route GET /api/footer
export const getFooter = asyncHandler(async (req, res) => {
  const footer = await Footer.findOne();
  res.json(footer);
});

// @desc Update footer content
// @route PUT /api/footer
export const updateFooter = asyncHandler(async (req, res) => {
  let footer = await Footer.findOne();

  if (!footer) {
    footer = new Footer({ sections: [] });
  }

  footer.sections = req.body.sections;
  const updatedFooter = await footer.save();
  res.json(updatedFooter);
});
