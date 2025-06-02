import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import '../styles/AllBooks.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load books.');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (book) => {
    if (!user) {
      alert('Please log in to add to cart.');
      return;
    }
    // Fetch user cart, add or update book, then PUT to backend
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/cart`)
      .then(res => res.json())
      .then(cart => {
        let updatedCart = Array.isArray(cart) ? cart.slice() : [];
        const idx = updatedCart.findIndex(item => (item.book?._id || item.book?.id) === (book._id || book.id));
        if (idx > -1) {
          updatedCart[idx].quantity += 1;
        } else {
          updatedCart.push({ book: book._id || book.id, quantity: 1 });
        }
        return fetch(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/cart`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: updatedCart }),
        });
      })
      .then(() => {
        alert('Book added to cart!');
      });
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="all-books">
      <h1>All Books</h1>
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '1.5rem', fontSize: '1rem' }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && filteredBooks.length === 0 && <p>No books found.</p>}
      <div className="book-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book._id || book.id} book={book} onAddToCart={() => handleAddToCart(book)} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;