import asyncHandler from '../middleware/asyncHandler.js';

const uploadImage = asyncHandler(async (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export { uploadImage };
