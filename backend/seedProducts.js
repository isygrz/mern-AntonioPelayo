import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import connectDB from './db.js';
import Product from './models/Product.js';

const products = [
  {
    name: 'Talavera Blue Tile',
    slug: 'talavera-blue-tile',
    image: '/uploads/product-1.jpg',
    badge: 'New',
    price: 25.0,
    description:
      'Handcrafted blue tile inspired by traditional Talavera techniques.',
    countInStock: 100,
    isSample: false,
  },
  {
    name: 'Oaxacan Sun Tile',
    slug: 'oaxacan-sun-tile',
    image: '/uploads/product-2.jpg',
    badge: 'Limited',
    price: 30.0,
    description: 'Vibrant yellow-orange tones reflect the Oaxacan sun.',
    countInStock: 50,
    isSample: false,
  },
];

export default async function seedProducts() {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);
  } catch (err) {
    console.error('❌ Product seeding failed:', err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedProducts();
}
