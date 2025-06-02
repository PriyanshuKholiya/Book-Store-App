import express from 'express';
import User from '../models/User.js';
import Book from '../models/Book.js';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const user = new User({ username, email, password, cart: [] });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('orderHistory savedItems cart.book');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// Get user cart
router.get('/:id/cart', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('cart.book');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
});

// Update user cart
router.put('/:id/cart', async (req, res) => {
  try {
    const { cart } = req.body; // [{book, quantity}]
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { cart },
      { new: true }
    ).populate('cart.book');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Get total user count
router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count users' });
  }
});

export default router;
