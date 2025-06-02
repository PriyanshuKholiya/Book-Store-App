import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ book, onAddToCart }) => {
  return (
    <div className="book-card">
      <img
        src={book.image || '/assets/placeholder.png'}
        alt={book.title}
        className="book-image"
      />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <p className="book-price">${book.price.toFixed(2)}</p>
      <Rating rating={book.rating} />
      <Link to={`/books/${book._id || book.id}`} className="book-details-link">
        View Details
      </Link>
      <button className="add-to-cart-button" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;