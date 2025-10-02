import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
      setTimeout(() => setShowContent(true), 300);
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
            <i className="fas fa-utensils logo-icon"></i>
            <h1 className="brand-name">UR</h1>
          </div>
          
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          
          <p className="loading-text">Preparing your experience...</p>
        </div>

        <style jsx>{`
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, #2d2522 0%, #3d3128 50%, #2d2522 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .loading-content {
            text-align: center;
            padding: 1rem;
          }

          .logo-container {
            margin-bottom: 3rem;
            animation: scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          .logo-icon {
            font-size: 4rem;
            color: #d4a76a;
            margin-bottom: 1rem;
            display: block;
            animation: bounce 2s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          .brand-name {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(45deg, #d4a76a, #b87333);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
            letter-spacing: 2px;
          }

          .loading-spinner {
            margin: 2rem 0;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(212, 167, 106, 0.2);
            border-top: 3px solid #d4a76a;
            border-radius: 50%;
            margin: 0 auto;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-text {
            color: #d4a76a;
            font-size: 1rem;
            font-weight: 500;
            animation: pulse 1.5s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @media (max-width: 480px) {
            .logo-icon {
              font-size: 3rem;
            }

            .brand-name {
              font-size: 2rem;
            }

            .spinner {
              width: 40px;
              height: 40px;
            }

            .loading-text {
              font-size: 0.9rem;
            }
          }
        `}</style>
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
              onClick={() => handleSelection('MenuePage')}
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
              onClick={() => handleSelection('AdminDashboard')}
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