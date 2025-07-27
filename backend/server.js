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

// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/mobile-sessions', mobileSessionRoutes);
app.use('/api/users', userRoutes);

// Serve static files from /uploads
const __dirnameFull = path.resolve();
app.use('/uploads', express.static(path.join(__dirnameFull, '/uploads')));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
