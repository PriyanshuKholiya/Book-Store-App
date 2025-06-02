import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user && user.isAdmin;
  const [books, setBooks] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [sales, setSales] = useState(0);
  const [booksSold, setBooksSold] = useState(0);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: '',
    rating: ''
  });
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  // Fetch books and stats
  const fetchBooks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  useEffect(() => {
    if (isAdmin) {
      fetchBooks();
      fetch(`${import.meta.env.VITE_API_URL}/api/users/count`)
        .then(res => res.json())
        .then(data => setUsersCount(data.count || 0))
        .catch(() => setUsersCount(0));
      fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
        .then(res => res.json())
        .then(data => {
          setSales(data.reduce((sum, order) => sum + (order.total || 0), 0));
          setBooksSold(data.reduce((sum, order) =>
            sum + (order.items ? order.items.reduce((s, i) => s + (i.quantity || 0), 0) : 0), 0));
        })
        .catch(() => {
          setSales(0);
          setBooksSold(0);
        });
    }
  }, [isAdmin]);

  // Add book via form
  const handleAddBook = (e) => {
    e.preventDefault();
    setError('');
    if (!newBook.title || !newBook.author || !newBook.price) {
      setError('Title, author, and price are required.');
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBook, price: parseFloat(newBook.price), rating: parseInt(newBook.rating) }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add book');
        return res.json();
      })
      .then(() => {
        fetchBooks();
        setNewBook({ title: '', author: '', price: '', description: '', image: '', rating: '' });
      })
      .catch(() => setError('Failed to add book'));
  };

  // Add book via JSON
  const handleAddBookJson = (e) => {
    e.preventDefault();
    setError('');
    try {
      const bookObj = JSON.parse(jsonInput);
      fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookObj),
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to add book');
          return res.json();
        })
        .then(() => {
          fetchBooks();
          setJsonInput('');
        })
        .catch(() => setError('Failed to add book from JSON'));
    } catch {
      setError('Invalid JSON');
    }
  };

  // Remove book
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, { method: 'DELETE' })
      .then(() => fetchBooks());
  };

  if (!isAdmin) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Dashboard</h1>
      <div style={{
        display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32
      }}>
        <div style={{
          background: '#f8f9fa', borderRadius: 8, padding: 24, minWidth: 200, boxShadow: '0 2px 8px #0001'
        }}>
          <h3>Books Sold</h3>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{booksSold}</div>
        </div>
        <div style={{
          background: '#f8f9fa', borderRadius: 8, padding: 24, minWidth: 200, boxShadow: '0 2px 8px #0001'
        }}>
          <h3>Users</h3>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{usersCount}</div>
        </div>
        <div style={{
          background: '#f8f9fa', borderRadius: 8, padding: 24, minWidth: 200, boxShadow: '0 2px 8px #0001'
        }}>
          <h3>Total Sales</h3>
          <div style={{ fontSize: 28, fontWeight: 700 }}>${sales.toFixed(2)}</div>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 32
      }}>
        <form onSubmit={handleAddBook} style={{
          background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 320, maxWidth: 400
        }}>
          <h3>Add Book (Form)</h3>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} required style={{ width: '100%', marginBottom: 8 }} />
          <input type="text" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} required style={{ width: '100%', marginBottom: 8 }} />
          <input type="number" placeholder="Price" value={newBook.price} onChange={e => setNewBook({ ...newBook, price: e.target.value })} required style={{ width: '100%', marginBottom: 8 }} />
          <input type="text" placeholder="Description" value={newBook.description} onChange={e => setNewBook({ ...newBook, description: e.target.value })} style={{ width: '100%', marginBottom: 8 }} />
          <input type="text" placeholder="Image URL" value={newBook.image} onChange={e => setNewBook({ ...newBook, image: e.target.value })} style={{ width: '100%', marginBottom: 8 }} />
          <input type="number" placeholder="Rating" min="1" max="5" value={newBook.rating} onChange={e => setNewBook({ ...newBook, rating: e.target.value })} style={{ width: '100%', marginBottom: 8 }} />
          <button type="submit" style={{ width: '100%', padding: 8, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}>Add Book</button>
        </form>
        <form onSubmit={handleAddBookJson} style={{
          background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 320, maxWidth: 400
        }}>
          <h3>Add Book (JSON)</h3>
          <textarea
            placeholder='Paste book JSON here'
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            rows={8}
            style={{ width: '100%', marginBottom: 8, fontFamily: 'monospace' }}
          />
          <button type="submit" style={{ width: '100%', padding: 8, background: '#28a745', color: '#fff', border: 'none', borderRadius: 4 }}>Add Book from JSON</button>
        </form>
      </div>

      <h2 style={{ marginBottom: 16 }}>All Books</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: 8 }}>Title</th>
              <th style={{ padding: 8 }}>Author</th>
              <th style={{ padding: 8 }}>Price</th>
              <th style={{ padding: 8 }}>Image</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id || book.id}>
                <td style={{ padding: 8 }}>{book.title}</td>
                <td style={{ padding: 8 }}>{book.author}</td>
                <td style={{ padding: 8 }}>${book.price?.toFixed(2)}</td>
                <td style={{ padding: 8 }}>
                  <img src={book.image} alt={book.title} style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: 4 }} />
                </td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleDelete(book._id || book.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', marginRight: 8 }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;