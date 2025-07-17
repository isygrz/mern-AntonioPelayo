import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

// 🛒 Core Routes
import productRoutes from './routes/productRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// 🧩 CMS Routes
import blogRoutes from './routes/blogRoutes.js'; // ✅ CMS: Blog
import badgeRoutes from './routes/badgeRoutes.js'; // ✅ CMS: Badge
import heroRoutes from './routes/heroRoutes.js'; // ✅ CMS: Hero
import cmsRoutes from './routes/cmsRoutes.js'; // ✅ CMS: Dynamic Sections

// 🧱 Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔌 MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🧪 Dev Middleware
app.use(cors());
app.use(express.json());

// 📦 API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/uploads', uploadRoutes);

// 📚 CMS Endpoints
app.use('/api/blogs', blogRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/heroes', heroRoutes);
app.use('/api/cms', cmsRoutes); // 📎 CMS config for homepage sections

// 📁 Serve static assets
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 🛑 Fallback & Error Handling
app.use(notFound);
app.use(errorHandler);

// 🚀 Launch Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
