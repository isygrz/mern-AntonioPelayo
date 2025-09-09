import Product from '../models/Product.js';
import mongoose from 'mongoose';

/**
 * Utility: normalized slug
 */
const toSlug = (str = '') =>
  str
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);

/**
 * Health probe for products API family
 * GET /api/products/health
 * - Adds Cache-Control: no-store to avoid proxy/browser caching
 */
export const productsHealth = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    res.json({ status: 'ok', time: new Date().toISOString() });
  } catch {
    res.set('Cache-Control', 'no-store');
    res.status(200).json({ status: 'ok' });
  }
};

/**
 * Public list of products
 * GET /api/products
 * Query: page, pageSize, q (name contains), status (default: active; pass status=all to disable filter)
 */
export const getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(req.query.pageSize || '20', 10))
    );
    const skip = (page - 1) * pageSize;
    const q = (req.query.q || '').trim();
    const rawStatus = (req.query.status ?? 'active')
      .toString()
      .trim()
      .toLowerCase();

    const filter = {};
    // status=all disables status filtering
    if (rawStatus && rawStatus !== 'all') filter.status = rawStatus;
    if (q)
      filter.name = {
        $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        $options: 'i',
      };

    const [items, total] = await Promise.all([
      Product.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(pageSize),
      Product.countDocuments(filter),
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/products/:id
 * (also used by /api/products/mobile/:id through middleware)
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'invalid product id' });
    }
    const doc = await Product.findById(id);
    if (!doc) return res.status(404).json({ message: 'product not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/products/slug/:slug
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const doc = await Product.findOne({ slug });
    if (!doc) return res.status(404).json({ message: 'product not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

/**
 * Admin/Vendor listing
 * GET /api/products/admin
 */
export const listProductsAdmin = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(req.query.pageSize || '20', 10))
    );
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      Product.find({}).sort({ updatedAt: -1 }).skip(skip).limit(pageSize),
      Product.countDocuments({}),
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      images = [],
      slug,
      status = 'active',
      ...rest
    } = req.body || {};
    if (!name) return res.status(400).json({ message: 'name is required' });
    if (price == null || Number.isNaN(Number(price)))
      return res.status(400).json({ message: 'valid price is required' });

    let newSlug = (slug || '').trim() || toSlug(name);
    // ensure unique slug
    let exists = await Product.findOne({ slug: newSlug });
    if (exists)
      newSlug = `${newSlug}-${new mongoose.Types.ObjectId()
        .toString()
        .slice(-6)}`;

    const doc = await Product.create({
      name,
      price: Number(price),
      images,
      slug: newSlug,
      status,
      ...rest,
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/products/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patch = { ...req.body };

    if (patch.slug) {
      const exists = await Product.findOne({
        slug: patch.slug,
        _id: { $ne: id },
      });
      if (exists)
        return res.status(409).json({ message: 'slug already in use' });
    }

    if (patch.price != null && Number.isNaN(Number(patch.price))) {
      return res.status(400).json({ message: 'invalid price' });
    }
    if (patch.price != null) patch.price = Number(patch.price);

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: patch },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'product not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Product.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'product not found' });
    res.json({ deleted: true, id });
  } catch (err) {
    next(err);
  }
};
