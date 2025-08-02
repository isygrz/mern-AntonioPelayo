import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Order from './models/Order.js';
import Product from './models/Product.js';
import User from './models/User.js';
import { logSeed } from './utils/logSeed.js';

export async function seedOrders() {
  logSeed('Orders', 'start');
  try {
    await Order.deleteMany();

    // 🧠 Get one user and one product to reference
    const user = await User.findOne();
    const product = await Product.findOne();

    if (!user || !product) {
      throw new Error('Required user or product not found');
    }

    const orders = [
      {
        user: user._id,
        orderItems: [
          {
            product: product._id,
            quantity: 2,
          },
        ],
        shippingAddress: {
          addressLine1: '123 Test St',
          addressLine2: '',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
        },
        status: 'created',
        isPaid: false,
      },
    ];

    const created = await Order.insertMany(orders);
    logSeed('Orders', 'success', created.length);
  } catch (err) {
    logSeed('Orders', 'error');
    console.error(err);
    throw err;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await connectDB();
    await seedOrders();
    mongoose.disconnect();
  } catch (err) {
    process.exit(1);
  }
}
