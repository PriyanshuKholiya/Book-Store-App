import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => setFeaturedBooks(data.slice(0, 5)));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="hero-banner" style={{ textAlign: 'center', width: '100%' }}>
        <h1>Welcome to the Book Store</h1>
        <p>Your one-stop shop for all your reading needs!</p>
      </div>
      <h2 style={{ textAlign: 'center' }}>Featured Books</h2>
      <div className="book-grid" style={{ width: '90%', maxWidth: 1200 }}>
        {featuredBooks.map((book) => (
          <BookCard key={book._id || book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;