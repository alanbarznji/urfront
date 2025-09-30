'use client';

import React from 'react';

export default function FloatingCart({ cartItems = [], currencySymbol = '$', convertPrice = (price) => price.toFixed(2), t = (key) => key, onClose = () => {}, darkMode = false }) {
  // Safety check - if cartItems is undefined or null, return null
  if (!cartItems || cartItems.length === 0) return null;

  return (
    <div className={`floating-cart ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="floating-cart-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{t('yourCart')}</h6>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      <div className="floating-cart-body">
        {cartItems.map((item, i) => (
          <div key={i} className="cart-item d-flex align-items-center mb-3">
            <img 
              src={item.image || '/default.jpg'} 
              alt={item.name || 'Product'} 
              className="cart-item-img" 
            />
            <div className="ms-3">
              <div className="fw-semibold">{item.name || 'Product'}</div>
              <small className="text-muted">
                {currencySymbol}{convertPrice(item.price || 0)}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}