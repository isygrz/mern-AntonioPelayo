import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || 'development',
    assetBaseUrl: process.env.ASSET_BASE_URL || '',
  });
});

router.get('/api/health/db', async (req, res) => {
  const state = mongoose.connection.readyState; // 1 = connected
  res.json({ status: state === 1 ? 'ok' : 'down', state });
});

router.get('/api/cms/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/api/products/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
