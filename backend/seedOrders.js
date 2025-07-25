import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import connectDB from './db.js';
import Order from './models/Order.js';

const orderSeed = [
  {
    user: '000000000000000000000001', // Example ObjectId placeholder
    orderItems: [
      {
        name: 'Talavera Blue Tile',
        qty: 2,
        image: '/uploads/product-1.jpg',
        price: 25.0,
        product: '000000000000000000000111', // Example Product ObjectId
      },
    ],
    shippingAddress: {
      address: '123 Main Street',
      city: 'Guadalajara',
      postalCode: '44100',
      country: 'Mexico',
    },
    paymentMethod: 'Credit Card',
    totalPrice: 50.0,
    isPaid: true,
    isDelivered: false,
  },
];

export default async function seedOrders() {
  try {
    await connectDB();
    await Order.deleteMany();
    await Order.insertMany(orderSeed);
    console.log('✅ Orders seeded!');
  } catch (err) {
    console.error('❌ Order seeding failed:', err.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedOrders();
}
