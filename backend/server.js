import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

// 🛒 Routes
import productRoutes from './routes/productRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import blogRoutes from './routes/blogRoutes.js'; // ✅ CMS: Blog
import badgeRoutes from './routes/badgeRoutes.js'; // ✅ CMS: Badge
import heroRoutes from './routes/heroRoutes.js'; // ✅ CMS: Hero

// 🧱 Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧪 Dev Middleware
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 📦 API Routes
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/blogs', blogRoutes); // ✅ CMS: Blog
app.use('/api/badges', badgeRoutes); // ✅ CMS: Badge
app.use('/api/heroes', heroRoutes); // ✅ CMS: Hero

// 📁 Serve /uploads statically
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ❌ Error Handling
app.use(notFound);
app.use(errorHandler);

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
