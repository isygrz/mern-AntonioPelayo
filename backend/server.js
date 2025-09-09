import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_ORIGIN = (
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
).trim();
const PORT = process.env.PORT || 5000;

const app = express();

// Disable ETag to avoid 304 on JSON APIs (prevents empty bodies confusing the client)
app.set('etag', false);

// --- CORS (must be before routes) ---
const corsOptions = {
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: [],
  maxAge: 600,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.vary('Origin');
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

// --- Common middleware ---
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- DB ---
try {
  await connectDB();
} catch (err) {
  console.error('💥 Cannot start server without DB. Exiting.');
  process.exit(1);
}

// --- Safe route mounting helper ---
async function safeMount(mountPath, importFn, name) {
  try {
    const mod = await importFn();
    const router = mod.default ?? mod;
    app.use(mountPath, router);
    console.log(`✓ mounted ${name} at ${mountPath || '/'} `);
  } catch (err) {
    console.error(`✗ FAILED mounting ${name} at ${mountPath || '/'} `);
    console.error(err?.stack || err);
  }
}

// --- Mount routers ---
await safeMount(
  '/',
  () => import('./routes/healthRoutes.js'),
  'healthRoutes.js'
);

// CHANGED: mount footerRoutes at '/api' so the router can expose '/footer' and
// the final path is '/api/footer', matching the frontend axios baseURL '/api' and Vite proxy.
await safeMount(
  '/api',
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
await safeMount(
  '/api/admin',
  () => import('./routes/adminUserRoutes.js'),
  'adminUserRoutes.js'
);

// --- 404 fallthrough ---
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found', path: req.path });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 FRONTEND_ORIGIN (CORS): ${FRONTEND_ORIGIN}`);
});
