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

dotenv.config();
connectDB();

const app = express();

// ✅ Fix CORS config to allow credentials securely
const allowedOrigins = ['http://localhost:5173']; // Replace with production frontend if needed
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/mobile-sessions', mobileSessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/footer', footerRoutes);

// Serve static uploads
const __dirnameFull = path.resolve();
app.use('/uploads', express.static(path.join(__dirnameFull, '/uploads')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
