import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Order from './models/Order.js';

dotenv.config();
await connectDB();

const orders = [
  {
    cartItems: [
      {
        name: 'Sample Tile 1',
        slug: 'sample-tile-1',
        qty: 2,
        image: '/uploads/sample1.jpg',
        price: 25.0,
        product: new mongoose.Types.ObjectId(), // placeholder ObjectId
      },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Elm Street',
      city: 'Los Angeles',
      postalCode: '90001',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    totalPrice: 50.0,
    guestSessionId: 'guest-123-abc', // adjust to match your session strategy
    isPaid: false,
    isDelivered: false,
  },
];

try {
  await Order.deleteMany();
  const inserted = await Order.insertMany(orders);
  console.log(`✅ Seeded ${inserted.length} orders`);
  process.exit(0);
} catch (error) {
  console.error('❌ Order seeding failed:', error);
  process.exit(1);
}
