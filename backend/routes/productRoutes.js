import express from 'express';
import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

// GET /api/products - All
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// GET /api/products/:id - By ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
