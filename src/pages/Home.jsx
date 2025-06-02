import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then(data => {
        setFeaturedBooks(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load featured books.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="hero-banner" style={{ textAlign: 'center', width: '100%' }}>
        <h1>Welcome to the Book Store</h1>
        <p>Your one-stop shop for all your reading needs!</p>
      </div>
      <h2 style={{ textAlign: 'center' }}>Featured Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && featuredBooks.length === 0 && <p>No featured books found.</p>}
      <div className="book-grid" style={{ width: '90%', maxWidth: 1200 }}>
        {featuredBooks.map((book) => (
          <BookCard key={book._id || book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;