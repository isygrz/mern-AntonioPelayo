import express from 'express';
import Product from '../models/Product.js';
import data from '../data.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await Product.deleteMany({});
    const seededProducts = await Product.insertMany(data.products);
    res.status(201).json({
      message: `Seeded ${seededProducts.length} products`,
      products: seededProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
});

export default router;
