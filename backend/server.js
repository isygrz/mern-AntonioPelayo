import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// 🔌 DB Connection
import connectDB from './db.js';

// 🛒 Core Routes
import productRoutes from './routes/productRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// 🧩 CMS Routes
import blogRoutes from './routes/blogRoutes.js';
import badgeRoutes from './routes/badgeRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import cmsRoutes from './routes/cmsRoutes.js';

// 🧱 Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB(); // ✅ Called once here only

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use('/api/cms', cmsRoutes);

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
