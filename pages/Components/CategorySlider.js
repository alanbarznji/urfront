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
console.log(categories,">>>>>>>>>>");
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
                className={`category-btn-new ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => {
                  console.log(category.name);
                  setActiveCategory(category.name)}}
                aria-label={`Filter by ${t(` ${category.name}`) || category}`}
              >
                <div className="category-btn-content">
                  <div className="category-icon-wrapper">
                    <i className={`fas ${categoryIcons[category.name] || 'fa-utensils'}`}></i>
                  </div>
                  <span className="category-name">{t(`${category.name}`) || category}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}