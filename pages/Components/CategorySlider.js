// Enhanced CategorySlider Component with improved styling
import React from 'react';

export default function CategorySlider({ categories, activeCategory, setActiveCategory, t,language }) {
  // Category icons mapping
  console.log(language,"language");
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
          {categories?.map((category, index) => {
 
          return (
            <div key={index} className="category-item">
              <button
                className={`category-btn-new ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                }}
                aria-label={`Filter by ${t(` ${category.name}`) || category}`}
              >
                <div className="category-btn-content">
                  <div className="category-icon-wrapper">
                    <i className={`fas ${category.icon ?? "fa-th-large"}`}></i>
                  </div>
                  <span className="category-name">{`${
                    language == "ar" ? category.namear : category.name
                  }`}</span>
                </div>
              </button>
            </div>
          );
})}
        </div>
      </div>
    </div>
  );
}