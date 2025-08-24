// Verbose Mongo connector with clear logs and early failure on missing env.

import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = (process.env.MONGODB_URI || '').trim();
  if (!uri) {
    console.error('❌ MONGODB_URI is missing from .env');
    throw new Error('MONGODB_URI not set');
  }

  try {
    console.log('🌐 Connecting to MongoDB cluster...');
    // Optional: keep Mongoose a bit stricter but quiet
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri, {
      // keep defaults for Mongoose v7+, these are mainly illustrative
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    const { host, port, name } = mongoose.connection;
    console.log(`✅ MongoDB connected (${host}:${port}/${name})`);
  } catch (err) {
    console.error('❌ DB connection error:', err?.message || err);
    throw err;
  }
}

export function dbHealth() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;
  return {
    readyState: state,
    connected: state === 1,
  };
}

export default connectDB;
