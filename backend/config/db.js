import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // Prevent multiple connects

  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in environment variables.');
      process.exit(1);
    }

    console.log(`🌐 Connecting to MongoDB cluster...`);
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
