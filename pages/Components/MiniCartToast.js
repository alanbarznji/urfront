import React, { useEffect } from 'react';

export default function MiniCartToast({ item, show, onClose, t }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || !item) return null;

  return (
    <div className="mini-cart-toast animate__animated animate__fadeInRight">
      <div className="d-flex align-items-center">
        <img
          src={""}
          alt={item.name}
          className="toast-img"
        />
        <div className="toast-details ms-3">
          <strong>{item.name}</strong>
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            {t('addedToCart')}
          </p>
        </div>
      </div>
    </div>
  );
}
