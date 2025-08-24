import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

/** Minimal schema to ping the DB without touching your project models */
const PingSchema = new mongoose.Schema(
  { ping: String },
  { collection: 'diag_ping', versionKey: false }
);
const Ping = mongoose.model('DiagPing', PingSchema);

/** Connect with strong logging — no other imports, no routes registered */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI missing in .env');
    return;
  }

  mongoose.connection.on('connecting', () =>
    console.log('🟡 Mongoose: connecting…')
  );
  mongoose.connection.on('connected', () =>
    console.log('🟢 Mongoose: connected')
  );
  mongoose.connection.on('reconnected', () =>
    console.log('🟢 Mongoose: reconnected')
  );
  mongoose.connection.on('disconnected', () =>
    console.log('🔴 Mongoose: disconnected')
  );
  mongoose.connection.on('error', (err) =>
    console.error('🔴 Mongoose error:', err?.message || err)
  );

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 10000,
      retryWrites: true,
    });
  } catch (err) {
    console.error('❌ connect() failed:', err?.message || err);
  }
}

/** Routes */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

app.get('/api/health/db', async (_req, res) => {
  try {
    // quick no-op read to force a round trip
    await Ping.findOne().lean().exec();
    res.json({ db: 'ok', state: mongoose.connection.readyState });
  } catch (err) {
    res.status(503).json({
      db: 'error',
      message: err?.message || String(err),
      state: mongoose.connection.readyState,
    });
  }
});

app.use((req, res) =>
  res.status(404).json({ message: 'Not Found (diag)', path: req.path })
);

app.listen(PORT, async () => {
  console.log(`✅ Diag server running on ${PORT}`);
  await connectDB();
});
