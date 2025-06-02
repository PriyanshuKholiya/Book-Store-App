import React, { useEffect, useState } from 'react';

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      fetch(`http://localhost:5000/api/users/${user._id}/cart`)
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
        });
    }
  }, [user]);

  const validCode = 'DISCOUNT10';
  const discountPercent = 10;

  const calculateTotal = () => {
    let total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    if (discountApplied) {
      total = total * (1 - discountPercent / 100);
    }
    return total.toFixed(2);
  };

  const handleDiscount = (e) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === validCode) {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
      alert('Invalid discount code');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your purchase!');
    // Optionally, clear cart in backend here
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="checkout" style={{ textAlign: 'center' }}>
          <h2>Checkout</h2>
          <p>Please log in to proceed to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#f7f7f7' }}>
      <div className="checkout" style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: 32, minWidth: 350, maxWidth: 500, margin: '2rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Checkout</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" placeholder="Enter your address" required />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date:</label>
            <input type="text" id="expiry" placeholder="MM/YY" required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" placeholder="123" required />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label htmlFor="discount">Discount Code:</label>
            <input
              type="text"
              id="discount"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleDiscount} style={{ padding: '6px 12px' }}>
              Apply Discount
            </button>
            {discountApplied && <span style={{ color: 'green', marginLeft: 8 }}>Applied!</span>}
          </div>
          <button type="submit" className="checkout-button" style={{ marginTop: 8 }}>Complete Purchase</button>
        </form>

        <h3 style={{ marginTop: 32 }}>Order Summary</h3>
        <ul className="order-summary" style={{ padding: 0, listStyle: 'none' }}>
          {cartItems.map((item) => (
            <li key={item._id || item.id} className="order-item" style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>{item.title}</span>
              <span style={{ marginLeft: 8 }}>Quantity: {item.quantity}</span>
              <span style={{ marginLeft: 8 }}>Price: ${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h4 className="total-amount" style={{ textAlign: 'right', marginTop: 16 }}>
          Total: ${calculateTotal()}
          {discountApplied && <span style={{ color: 'green', marginLeft: 10 }}>({discountPercent}% off)</span>}
        </h4>
        <div style={{ fontSize: '0.95em', color: '#888', marginTop: 8 }}>
          Use code <b>DISCOUNT10</b> for 10% off.
        </div>
      </div>
    </div>
  );
};

export default Checkout;