import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import mobileSessionRoutes from './routes/mobileSessionRoutes.js';
import cmsRoutes from './routes/cmsRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import footerRoutes from './routes/footerRoutes.js';

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// ---- CORS ----
// Prefer env-driven FRONTEND_ORIGIN, fallback to localhost:5173
const FRONTEND_ORIGIN = (
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
).trim();
app.use(
  cors({
    origin: [FRONTEND_ORIGIN],
    credentials: true,
  })
);

// ---- Core middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---- API routes ----
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/mobile-sessions', mobileSessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/footer', footerRoutes);

// ---- Static uploads (absolute URLs rely on this) ----
const __dirnameFull = path.resolve();
app.use('/uploads', express.static(path.join(__dirnameFull, '/uploads')));

// ---- Healthcheck & diagnostics ----
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    nodeEnv: process.env.NODE_ENV || 'development',
    assetBaseUrl:
      process.env.ASSET_BASE_URL || `${req.protocol}://${req.get('host')}`,
    frontendOrigin: FRONTEND_ORIGIN,
  });
});

// ---- Start server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const assetBase = process.env.ASSET_BASE_URL || `http://localhost:${PORT}`;
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🖼  ASSET_BASE_URL: ${assetBase}`);
  console.log(`🌐 FRONTEND_ORIGIN (CORS): ${FRONTEND_ORIGIN}`);
});
