import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../pages/assets/Logo.png";
export default function WelcomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => handleSelection("menuepage"), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelection = (type) => {
    setSelectedOption(type);
    setIsTransitioning(true);
    
    // Save selection to localStorage
    localStorage.setItem('orderType', type);
    
    // Navigate to menu after animation
    setTimeout(() => {
      router.push(`/${type}`);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-container">
     
                   <Image src={logo} height={200} width={200}/>
   
          </div>
          
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          
          {/* <p className="loading-text">Preparing your experience...</p> */}
        </div>

    
      </div>
    );
  }

  return (
    <div className={`welcome-page ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="welcome-background">
        <div className="bg-pattern"></div>
      </div>

      <div className={`welcome-container ${showContent ? 'visible' : ''}`}>
        <div className="welcome-header">
          <div className="brand-section">
            <i className="fas fa-utensils brand-icon"></i>
            <h1 className="welcome-title">Welcome to UR</h1>
            <p className="welcome-subtitle">Your culinary journey begins here</p>
          </div>
        </div>

        <div className="selection-section">
          <h2 className="selection-title">How would you like to enjoy your meal?</h2>
          
          <div className="options-container">
            <div 
              className={`option-card delivery ${selectedOption === 'delivery' ? 'selected' : ''}`}
              onClick={() => handleSelection('menuepage')}
            >
              <div className="option-icon-wrapper">
                <div className="icon-circle">
                  <i className="fas fa-motorcycle"></i>
                </div>
              </div>
              <div className="option-content">
                <h3>Delivery</h3>
                <p>We'll bring delicious food to your doorstep</p>
                <div className="option-features">
                  <span><i className="fas fa-check"></i> Fast delivery</span>
                  <span><i className="fas fa-check"></i> Track your order</span>
                  <span><i className="fas fa-check"></i> Safe & secure</span>
                </div>
              </div>
              {selectedOption === 'delivery' && (
                <div className="selected-indicator">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>

            <div 
              className={`option-card dine-in ${selectedOption === 'dine-in' ? 'selected' : ''}`}
              onClick={() => handleSelection('admindashboard')}
            >
              <div className="option-icon-wrapper">
                <div className="icon-circle">
                  <i className="fas fa-store"></i>
                </div>
              </div>
              <div className="option-content">
                <h3>Dine In</h3>
                <p>Experience our restaurant atmosphere</p>
                <div className="option-features">
                  <span><i className="fas fa-check"></i> Fresh & hot</span>
                  <span><i className="fas fa-check"></i> Table service</span>
                  <span><i className="fas fa-check"></i> Cozy ambiance</span>
                </div>
              </div>
              {selectedOption === 'dine-in' && (
                <div className="selected-indicator">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="welcome-footer">
          <p>Select an option to continue to our menu</p>
        </div>
      </div>

 
    </div>
  );
}