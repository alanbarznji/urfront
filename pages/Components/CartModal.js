import React from 'react';

export default function CartModal({ cartItems = [], currencySymbol = '$', convertPrice = (price) => price.toFixed(2), t = (key) => key, onClose }) {
  // Use a default empty array and add a null check with optional chaining
  const total = cartItems?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0) || 0;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('yourCart')}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {cartItems && cartItems.length > 0 ? (
              <ul className="list-group">
                {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image || '/default.jpg'}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}
                      />
                      <div>
                        <h6 className="mb-1">{item.name}</h6>
                        <small className="text-muted">
                          {item.quantity} × {currencySymbol}{convertPrice(item.price)}
                        </small>
                      </div>
                    </div>
                    <strong>{currencySymbol}{convertPrice(item.price * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">{t('cartEmpty')}</p>
            )}
          </div>
          <div className="modal-footer">
            <h5 className="me-auto">{t('total')}: {currencySymbol}{convertPrice(total)}</h5>
            <button type="button" className="btn btn-secondary" onClick={onClose}>{t('close')}</button>
            <button type="button" className="btn btn-primary">{t('checkout')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}