'use client';

import { useEffect } from "react";

export default function LanguageCurrencyBar({ 
  language = 'en', 
  setLanguage = () => {},             
  currency = 'USD', 
  setCurrency = () => {}, 
  darkMode = false 
}) {
  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];
  
  // Available currencies
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' }
  ];
  
  // Find the current language and currency with safe fallbacks
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  const currentCurrency = currencies.find(curr => curr.code === currency) || currencies[0];
  
  // Set document direction for RTL languages
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  return (
    <div className={`language-currency-selector py-2 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
      <div className="container">
        <div className="d-flex justify-content-end align-items-center">
          <div className="dropdown me-3">
            <button 
              className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'} dropdown-toggle px-3 rounded-pill`}
              type="button" 
              id="languageDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {currentLanguage.flag} {currentLanguage.name}
            </button>
            <ul className={`dropdown-menu dropdown-menu-end ${darkMode ? 'dropdown-menu-dark' : ''}`} aria-labelledby="languageDropdown">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button 
                    className={`dropdown-item ${language === lang.code ? 'active' : ''} d-flex align-items-center`}
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span className="me-2">{lang.flag}</span> {lang.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="dropdown">
            <button 
              className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'} dropdown-toggle px-3 rounded-pill`}
              type="button" 
              id="currencyDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {currentCurrency.symbol} {currentCurrency.code}
            </button>
            <ul className={`dropdown-menu dropdown-menu-end ${darkMode ? 'dropdown-menu-dark' : ''}`} aria-labelledby="currencyDropdown">
              {currencies.map((curr) => (
                <li key={curr.code}>
                  <button 
                    className={`dropdown-item ${currency === curr.code ? 'active' : ''}`}
                    onClick={() => setCurrency(curr.code)}
                  >
                    <span className="me-2">{curr.symbol}</span> {curr.code} - {curr.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}