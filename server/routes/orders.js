import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

// Place new order
router.post('/', async (req, res) => {
  const { userId, items, total } = req.body;
  const order = new Order({ user: userId, items, total });
  await order.save();
  // Add order to user's order history
  await User.findByIdAndUpdate(userId, { $push: { orderHistory: order._id } });
  res.status(201).json(order);
});

// Get orders for a user
router.get('/user/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('items.book');
  res.json(orders);
});

export default router;
