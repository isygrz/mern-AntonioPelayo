import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

// GET /api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Product',
    slug: `sample-${Date.now()}`,
    pricing: {
      perBox: 0,
      sample: 0,
    },
    image: '/images/default.jpg',
    description: '',
    badge: '',
    countInStock: 0,
    user: req.user._id,
  });

  const created = await product.save();
  res.status(201).json(created);
});

// PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, slug, pricing, image, description, badge, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name ?? product.name;
    product.slug = slug ?? product.slug;
    product.pricing = pricing ?? product.pricing;
    product.image = image ?? product.image;
    product.description = description ?? product.description;
    product.badge = badge ?? product.badge;
    product.countInStock = countInStock ?? product.countInStock;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
