import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Store hashed passwords in production!
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  isAdmin: { type: Boolean, default: false },
  cart: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: Number,
    }
  ],
});

export default mongoose.model('User', userSchema);
