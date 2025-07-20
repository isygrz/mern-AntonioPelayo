import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // Prevent multiple connects

  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI); // Logged once
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
