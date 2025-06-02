import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  content: String,
  user: String,
  rating: Number,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  image: String,
  rating: Number,
  reviews: [reviewSchema],
});

export default mongoose.model('Book', bookSchema);
