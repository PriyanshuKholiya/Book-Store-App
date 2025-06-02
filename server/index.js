import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import booksRouter from './routes/books.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
app.use(cors());
app.use(express.json());

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
