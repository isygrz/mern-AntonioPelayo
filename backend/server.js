import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';
import seedRoutes from './routes/seedRoutes.js'; // ✅ ensure this is here
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ parse JSON bodies

const PORT = process.env.PORT || 5000;

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ ROUTES
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes); // ✅ REGISTERED HERE

// ✅ Middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
