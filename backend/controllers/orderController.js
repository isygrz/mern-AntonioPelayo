import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc    Create new order (guest or user)
// @route   POST /api/orders
// @access  Public or Protected
export const createOrder = asyncHandler(async (req, res) => {
  const { guestSessionId, items, shippingAddress, totalAmount } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No items in order');
  }

  const orderData = {
    items,
    shippingAddress,
    totalAmount,
    status: 'pending',
  };

  if (req.user) {
    orderData.user = req.user._id;
  } else if (guestSessionId) {
    orderData.guestSessionId = guestSessionId;
  } else {
    res.status(400);
    throw new Error('Missing user or guest session ID');
  }

  const createdOrder = await Order.create(orderData);
  res.status(201).json(createdOrder);
});
