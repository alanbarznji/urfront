// components/CartDrawerDelivery.js - CART WITH CUSTOMER INFO DISPLAY

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawerDelivery({
  cartItems,
  currencySymbol,
  convertPrice,
  t,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  darkMode,
  customerInfo, // ✅ NEW PROP
}) {
  const total = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Close the drawer when pressing ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle quantity update with validation
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  // Calculate totals
  const subtotal = total;
  const tax = total * 0.1;
  const deliveryFee = total > 0 ? 5.99 : 0;
  const grandTotal = subtotal + tax + deliveryFee;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`cart-drawer ${darkMode ? "dark" : ""}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="cart-drawer-header">
              <h2 className="cart-drawer-title">
                <i className="fas fa-shopping-cart me-2"></i>
                {t("yourCart")}
              </h2>
              <button className="cart-drawer-close" onClick={onClose}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* ✅ CUSTOMER INFO DISPLAY */}
            {customerInfo && (
              <div className="cart-customer-info">
                <div className="customer-info-card">
                  <div className="customer-header">
                    <i className="fas fa-user-circle"></i>
                    <h3>Delivery Information</h3>
                  </div>

                  <div className="customer-details">
                    <div className="detail-row">
                      <i className="fas fa-user"></i>
                      <div className="detail-content">
                        <span className="detail-label">Name</span>
                        <span className="detail-value">
                          {customerInfo.name}
                        </span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <i className="fas fa-phone"></i>
                      <div className="detail-content">
                        <span className="detail-label">Phone 1</span>
                        <span className="detail-value">
                          {customerInfo.phone1}
                        </span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <i className="fas fa-phone"></i>
                      <div className="detail-content">
                        <span className="detail-label">Phone 2</span>
                        <span className="detail-value">
                          {customerInfo.phone2}
                        </span>
                      </div>
                    </div>

                    {customerInfo.phone3 && (
                      <div className="detail-row">
                        <i className="fas fa-phone"></i>
                        <div className="detail-content">
                          <span className="detail-label">Phone 3</span>
                          <span className="detail-value">
                            {customerInfo.phone3}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="detail-row">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="detail-content">
                        <span className="detail-label">Address</span>
                        <span className="detail-value">
                          {customerInfo.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="cart-drawer-body">
              {cartItems.length > 0 ? (
                <>
                  <ul className="cart-items">
                    {cartItems.map((item) => (
                      <li key={item.id} className="cart-item">
                        <img
                          src="https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg?w=1440&fm=webp&q=80"
                          className="card-img-top p-2 rounded-4"
                          alt={item.name}
                          loading="lazy"
                          style={{ height: "100px", width: "100px" }}
                        />
                        <div className="cart-item-details">
                          <div className="cart-item-info">
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-price">
                              {currencySymbol}
                              {convertPrice(item.price)}
                            </p>
                          </div>
                          <div className="cart-item-controls">
                            <div className="cart-item-quantity">
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="quantity-value">
                                {item.quantity}
                              </span>
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <button
                              className="cart-item-remove"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>{t("subtotal")}</span>
                      <span>
                        {currencySymbol}
                        {convertPrice(subtotal)}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>{t("tax")}</span>
                      <span>
                        {currencySymbol}
                        {convertPrice(tax)}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span>
                        {currencySymbol}
                        {convertPrice(deliveryFee)}
                      </span>
                    </div>
                    <div className="summary-row total">
                      <span>{t("total")}</span>
                      <span>
                        {currencySymbol}
                        {convertPrice(grandTotal)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="cart-empty">
                  <div className="cart-empty-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <h3 className="cart-empty-title">{t("cartEmpty")}</h3>
                  <p className="cart-empty-text">{t("startShopping")}</p>
                  <button
                    className="cart-empty-button rounded-3"
                    onClick={onClose}
                  >
                    {t("backToMenu")}
                  </button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-drawer-footer">
                <button className="cart-continue rounded-3" onClick={onClose}>
                  <i className="fas fa-arrow-left me-2"></i>
                  {t("continueShopping")}
                </button>
                <button
                  className="cart-checkout rounded-3"
                  onClick={onCheckout}
                >
                  Place Order
                  <i className="fas fa-check ms-2"></i>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
