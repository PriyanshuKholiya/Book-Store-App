import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import booksRouter from './routes/books.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import Book from './models/Book.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health-check route for uptime monitors
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Root-level route to get all books (for uptime bots or direct browser access)
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    console.log('Database name:', mongoose.connection.name);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
