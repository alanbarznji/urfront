// components/CartFloatingButton.js - A floating cart button for mobile

import React from 'react';

export default function CartFloatingButton({ itemCount, onClick, darkMode }) {
  return (
    <button 
      className={`cart-floating-btn ${darkMode ? 'dark' : ''} ${itemCount > 0 ? 'active' : ''}`}
      onClick={onClick}
      aria-label="Open cart"
    >
      <div className="cart-icon">
        <i className="fas fa-shopping-cart"></i>
      </div>
      {itemCount > 0 && (
        <div className="cart-count">{itemCount}</div>
      )}
    </button>
  );
}