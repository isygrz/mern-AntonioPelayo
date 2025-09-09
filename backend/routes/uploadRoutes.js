import express from 'express';
import multer from 'multer';
import verifyMobileSessionMiddleware from '../middleware/verifyMobileSessionMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Helper: 405 Method Not Allowed
const methodNotAllowed = (allowed) => (req, res) => {
  res.set('Allow', allowed.join(', '));
  return res
    .status(405)
    .json({ message: 'Method Not Allowed', path: req.path, allowed });
};

// Protected mobile upload route
router.post(
  '/mobile',
  verifyMobileSessionMiddleware,
  upload.single('image'),
  (req, res) => {
    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
  }
);
// 405 on '/mobile'
router.all('/mobile', methodNotAllowed(['POST']));

// Default upload route (admin-only)
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});
// 405 on '/'
router.all('/', methodNotAllowed(['POST']));

export default router;
