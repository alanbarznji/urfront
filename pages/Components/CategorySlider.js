// Enhanced CategorySlider Component with improved styling
import React from 'react';

export default function CategorySlider({ categories, activeCategory, setActiveCategory, t, darkMode }) {
  // Category icons mapping
  const categoryIcons = {
    all: "fa-th-large",
    burgers: "fa-hamburger",
    sandwiches: "fa-bread-slice",
    pizzas: "fa-pizza-slice",
    salads: "fa-leaf",
    desserts: "fa-ice-cream",
    drinks: "fa-glass-martini",
    sides: "fa-french-fries",
    mains: "fa-utensils"
  };

  return (
    <div className="category-slider-container">
      <div className="category-slider-wrapper">
        <div className="d-flex overflow-auto py-2 hide-scrollbar">
          {categories?.map((category, index) => (
            <div 
              key={index} 
              className="category-item"
            >
              <button
                className={`category-btn-new ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                aria-label={`Filter by ${t(`categories.${category}`) || category}`}
              >
                <div className="category-btn-content">
                  <div className="category-icon-wrapper">
                    <i className={`fas ${categoryIcons[category] || 'fa-utensils'}`}></i>
                  </div>
                  <span className="category-name">{t(`categories.${category}`) || category}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}