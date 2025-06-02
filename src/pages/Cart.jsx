import React, { useEffect, useState } from 'react';

const Cart = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  useEffect(() => {
    if (user && user._id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/cart`)
        .then(res => res.json())
        .then(cart => {
          if (Array.isArray(cart)) {
            setCartItems(cart.map(item => ({
              ...item.book,
              quantity: item.quantity
            })));
          } else {
            setCartItems([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setCartItems([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  // Update cart in backend
  const updateBackendCart = (updatedCart) => {
    if (user && user._id) {
      const backendCart = updatedCart.map(item => ({
        book: item._id || item.id,
        quantity: item.quantity
      }));
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/cart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: backendCart }),
      });
    }
  };

  const removeFromCart = (itemId) => {
    const updated = cartItems.filter((item) => (item._id || item.id) !== itemId);
    setCartItems(updated);
    updateBackendCart(updated);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updated = cartItems.map((item) =>
      (item._id || item.id) === itemId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updated);
    updateBackendCart(updated);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const proceedToCheckout = () => {
    window.location.href = '/checkout';
  };

  if (loading) return <div className="cart"><p>Loading...</p></div>;
  if (!user)
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        <p>Please log in to view your cart.</p>
      </div>
    );

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id || item.id} className="cart-item">
                <h2>{item.title}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="quantity-control">
                  <label htmlFor={`quantity-${item._id || item.id}`}>Quantity:</label>
                  <input
                    id={`quantity-${item._id || item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id || item.id, parseInt(e.target.value, 10))}
                  />
                </div>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id || item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <button onClick={proceedToCheckout} disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;