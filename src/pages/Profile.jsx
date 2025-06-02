import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="profile">
        <h1>Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1>{user.username || user.name}'s Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>

      <h2>Order History</h2>
      {user.orderHistory && user.orderHistory.length > 0 ? (
        <ul className="order-history">
          {user.orderHistory.map((order) => (
            <li key={order.id} className="order-item">
              <span className="order-title">{order.title}</span>
              <span className="order-date">{order.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      <h2>Saved Items</h2>
      {user.savedItems && user.savedItems.length > 0 ? (
        <ul className="saved-items">
          {user.savedItems.map((item) => (
            <li key={item.id} className="saved-item">
              {item.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved items found.</p>
      )}
    </div>
  );
};

export default Profile;