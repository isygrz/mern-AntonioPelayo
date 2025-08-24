// Clean boot: await DB, safe CORS, then mount each route module.
// NOTE: No wildcard paths (e.g. '*') are used with app.use/route methods.

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB, { dbHealth } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_ORIGIN = (
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
).trim();
const PORT = process.env.PORT || 5000;

const app = express();

// ---- CORS (no wildcard paths) ----
app.use(
  cors({
    origin: [FRONTEND_ORIGIN],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// OPTIONS preflight (again: no wildcard paths)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(204);
  }
  next();
});

// ---- Body / cookies / logs ----
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static uploads (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- DB FIRST ----
try {
  await connectDB();
} catch (err) {
  // Fail fast if DB cannot connect (avoids “buffering timed out” later)
  console.error('💥 Cannot start server without DB. Exiting.');
  process.exit(1);
}

// ---- Helper to mount route modules safely ----
async function safeMount(mountPath, importFn, name) {
  try {
    const mod = await importFn();
    const router = mod.default ?? mod;
    app.use(mountPath, router);
    console.log(`✓ mounted ${name} at ${mountPath}`);
  } catch (err) {
    console.error(`✗ FAILED mounting ${name} at ${mountPath}`);
    console.error(err?.stack || err);
  }
}

// ---- Mount routes (adjust as needed) ----
await safeMount(
  '/api/footer',
  () => import('./routes/footerRoutes.js'),
  'footerRoutes.js'
);
await safeMount(
  '/api/users',
  () => import('./routes/userRoutes.js'),
  'userRoutes.js'
);
await safeMount(
  '/api/cms',
  () => import('./routes/cmsRoutes.js'),
  'cmsRoutes.js'
);
await safeMount(
  '/api/inbox',
  () => import('./routes/inboxRoutes.js'),
  'inboxRoutes.js'
);
await safeMount(
  '/api/blogs',
  () => import('./routes/blogRoutes.js'),
  'blogRoutes.js'
);
await safeMount(
  '/api/products',
  () => import('./routes/productRoutes.js'),
  'productRoutes.js'
);

// ---- Health ----
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.get('/api/health/db', (req, res) => res.json({ db: dbHealth() }));

// 404 (diag) — do not use '*' matcher
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 FRONTEND_ORIGIN (CORS): ${FRONTEND_ORIGIN}`);
});
