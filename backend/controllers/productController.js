import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';
import { createSlug, ensureUniqueSlug } from '../utils/slug.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// @desc    Fetch product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
const createProduct = asyncHandler(async (req, res) => {
  // Allow creating from payload, but keep a safe fallback
  const name = req.body?.name || 'Sample Product';
  const baseSlug = createSlug(req.body?.slug || name);
  const uniqueSlug = await ensureUniqueSlug(Product, baseSlug);

  const sampleProduct = new Product({
    name,
    slug: uniqueSlug,
    price: req.body?.price ?? 0,
    user: req.user?._id,
    image: req.body?.image || 'http://localhost:5000/uploads/p4.jpeg',
    badge: req.body?.badge ?? null,
    brand: req.body?.brand || 'Sample Brand',
    category: req.body?.category || 'Sample Category',
    countInStock: req.body?.countInStock ?? 0,
    numReviews: req.body?.numReviews ?? 0,
    description: req.body?.description || 'Sample description',
    sku: req.body?.sku || `SKU-${Date.now()}`,
  });

  const createdProduct = await sampleProduct.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const prevName = product.name;
  const nextName = req.body?.name ?? product.name;
  const incomingSlug = req.body?.slug;

  product.name = nextName;
  product.price = req.body?.price ?? product.price;
  product.description = req.body?.description ?? product.description;
  product.image = req.body?.image ?? product.image;
  product.badge = req.body?.badge ?? product.badge;
  product.countInStock = req.body?.countInStock ?? product.countInStock;
  if (typeof req.body?.isSample !== 'undefined') {
    product.isSample = req.body.isSample;
  }

  // Slug rules:
  // 1) If explicit slug provided -> normalize + ensure unique
  // 2) Else if name changed OR slug missing -> generate from name and ensure unique
  if (incomingSlug) {
    const base = createSlug(incomingSlug);
    product.slug = await ensureUniqueSlug(Product, base, product._id);
  } else if (!product.slug || nextName !== prevName) {
    const base = createSlug(nextName);
    product.slug = await ensureUniqueSlug(Product, base, product._id);
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

export {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
