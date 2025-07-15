import Product from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products); // ✅ must be an array
  } catch (error) {
    console.error('❌ Error in getAllProducts:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};
