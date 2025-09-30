// components/CartNotification.js - A toast notification for added items

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartNotification({ 
  item, 
  isVisible, 
  onHide, 
  currencySymbol, 
  convertPrice, 
  t,
  darkMode 
}) {
  // Automatically hide the notification after 3 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`cart-notification ${darkMode ? 'dark' : ''}`}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
        >
   <div className="item-icon">
                  <img 
    src="https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg?w=1440&fm=webp&q=80" 
    className="card-img-top" 
    alt={item.name}
    loading="lazy"
 style={{height:"125px"}}
    />
          </div>
          <div className="notification-content">
            <div className="notification-header">
              <h3>{t('addedToCart')}</h3>
              <button className="notification-close" onClick={onHide}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="notification-item">{item.name}</p>
            <div className="notification-price">
              {currencySymbol}{convertPrice(item.price)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper function to get icon based on category
function getIconForCategory(category) {
  const categoryIcons = {
    burgers: "fa-hamburger",
    sandwiches: "fa-bread-slice",
    pizzas: "fa-pizza-slice",
    salads: "fa-leaf",
    desserts: "fa-ice-cream",
    drinks: "fa-glass-martini",
    sides: "fa-french-fries",
    mains: "fa-utensils"
  };
  
  return categoryIcons[category] || "fa-utensils";
}