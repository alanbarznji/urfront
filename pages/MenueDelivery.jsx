// pages/MenueDelivery.jsx - DELIVERY MENU PAGE WITH CUSTOMER INFO
import { useState, useEffect } from "react";
import Head from "next/head";
import CategorySlider from "./Components/CategorySlider";
import MenuItemCard from "./Components/MenuItemCard";
import { useTranslation } from "../src/data/useTranslation";
import { useCurrencyConverter } from "../src/data/useCurrencyConverter";
import CartDrawer from "./Components/CartDrawerDelivery";
import CartFloatingButton from "./Components/CartFloatingButton";
import CartNotification from "./Components/CartNotification";
import { useDispatch, useSelector } from "react-redux";
import { GetProductAction } from "@/Redux/Action/ProductAction";
import { GetCategoryAction } from "@/Redux/Action/CategoryAction";

export default function MenueDelivery() {
  // State management
  const [activeCategory, setActiveCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // ✅ NEW STATES FOR CUSTOMER INFO
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [tempItemToAdd, setTempItemToAdd] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone1: "",
    phone2: "",
    phone3: "",
    address: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(GetProductAction());
    dispatch(GetCategoryAction());
  }, []);

  const product = useSelector((state) => state.Product.Product);
  const Category = useSelector((state) => state.Category.Category);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  ];

  // ✅ VALIDATE FORM
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.phone1.trim()) {
      errors.phone1 = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone1)) {
      errors.phone1 = "Invalid phone number format";
    }
    
    if (!formData.phone2.trim()) {
      errors.phone2 = "Second phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone2)) {
      errors.phone2 = "Invalid phone number format";
    }
    
    if (formData.phone3.trim() && !/^[\d\s\-\+\(\)]+$/.test(formData.phone3)) {
      errors.phone3 = "Invalid phone number format";
    }
    
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    
    return errors;
  };

  // ✅ UPDATED ADD TO CART HANDLER
  const handleAddToCart = (item) => {
    // If cart is empty and no customer info, show customer modal first
    if (cart.length === 0 && !customerInfo) {
      setTempItemToAdd(item);
      setShowCustomerModal(true);
      return;
    }

    // Add item to cart normally
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    setLastAddedItem(item);
    setShowMiniCart(true);
  };

  // ✅ HANDLE FORM INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // ✅ NEW HANDLER FOR CUSTOMER INFO CONFIRMATION
  const handleCustomerConfirm = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Save customer info
    const customerData = {
      name: formData.name,
      phone1: formData.phone1,
      phone2: formData.phone2,
      phone3: formData.phone3 || null,
      address: formData.address
    };
    
    setCustomerInfo(customerData);
    localStorage.setItem("customerInfo", JSON.stringify(customerData));

    // Add the item to cart
    if (tempItemToAdd) {
      setCart([{ ...tempItemToAdd, quantity: 1 }]);
      setLastAddedItem(tempItemToAdd);
      setShowMiniCart(true);
    }

    // Close modal and reset
    setShowCustomerModal(false);
    setTempItemToAdd(null);
  };

  // ✅ UPDATED HANDLER TO CLEAR CART AND CUSTOMER INFO
  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear the cart? This will delete all items and reset customer information.")) {
      setCart([]);
      setCustomerInfo(null);
      setFormData({
        name: "",
        phone1: "",
        phone2: "",
        phone3: "",
        address: ""
      });
      localStorage.removeItem("customerInfo");
    }
  };

  // ✅ NEW CHECKOUT HANDLER
  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    alert(`Order confirmed!\nDelivery to: ${customerInfo.address}\nContact: ${customerInfo.name} (${customerInfo.phone1})`);
  };

  // Custom hooks
  const { t } = useTranslation(language);
  const { convertPrice, getCurrencySymbol } = useCurrencyConverter(currency);

  const categories = [{ name: "all" }, ...Category];

  const filteredMenu = product.filter((item) => {
    if (activeCategory !== "all" && item.category.name !== activeCategory)
      return false;
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (
        !e.target.closest(".language-selector") &&
        !e.target.closest(".language-dropdown")
      ) {
        setShowLanguageDropdown(false);
      }
      if (
        !e.target.closest(".currency-selector") &&
        !e.target.closest(".currency-dropdown")
      ) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      const isDarkMode = storedDarkMode === "true";
      setDarkMode(isDarkMode);
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.body.classList.toggle("light-mode", !isDarkMode);
    }

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      console.log(storedLanguage,"------------");
      setLanguage(storedLanguage);
    } else {
      setShowLanguageModal(true);
    }

    // ✅ RESTORE CUSTOMER INFO FROM LOCALSTORAGE
    const storedCustomer = localStorage.getItem("customerInfo");
    if (storedCustomer) {
      const parsed = JSON.parse(storedCustomer);
      setCustomerInfo(parsed);
      setFormData(parsed);
    }

    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency) setCurrency(storedCurrency);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  }, [language]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0];
  };

  const getCurrentCurrency = () => {
    return currencies.find((curr) => curr.code === currency) || currencies[0];
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* <Head>
        <title>{t("pageTitle")} - Delivery</title>
        <meta name="description" content={t("pageDescription")} />
      </Head> */}

      <nav
        className={`navbar navbar-expand ${
          darkMode ? "navbar-dark" : "navbar-light"
        } sticky-top shadow-sm`}
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #252018 0%, #3d3128 100%)"
            : "linear-gradient(135deg, #f9f6f3 0%, #e8d5c0 100%)",
          padding: "12px 0",
        }}
      >
        <div className="container py-1">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <i
              className="fas fa-motorcycle me-2"
              style={{
                color: "#4caf50",
                fontSize: "1.5rem",
              }}
            ></i>
            <span
              className="fw-bold"
              style={{
                background: "linear-gradient(45deg, #b87333, #8c5425)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.6rem",
                letterSpacing: "0.5px",
              }}
            >
              UR Delivery
            </span>
          </a>

          <div className="ms-auto d-flex align-items-center gap-2">
            {/* ✅ CUSTOMER INFO INDICATOR */}
            {customerInfo && (
              <div className="customer-indicator">
                <i className="fas fa-user"></i>
                <span className="d-none d-md-inline">{customerInfo.name}</span>
                <button
                  className="clear-customer-btn"
                  onClick={handleClearCart}
                  title="Clear cart and change customer info"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            {/* Language & Currency Selectors */}
       <div className="position-relative">
              <button
                className="currency-selector btn btn-sm d-flex align-items-center gap-2"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  color: darkMode ? "#ffffff" : "#333333",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  height: "40px",
                }}
                onClick={(e) => {
                  
                }}
              >
           {t("review")}
              </button>

 
            </div>

            <button
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
              onClick={toggleDarkMode}
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              }}
            >
              {darkMode ? (
                <i className="fas fa-sun" style={{ color: "#ff7e5f" }}></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container py-5">
          <div className="search-container mb-4">
            <div className="search-wrapper" role="search">
              <i className="fas fa-search search-icon"></i>
              <input
                type="search"
                className="search-input"
                placeholder={t("searchMenu")}
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          <CategorySlider
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            t={t}
            language={language}
            darkMode={darkMode}
          />

          {filteredMenu.length > 0 ? (
            <div className="menu-grid">
              {filteredMenu.map((item, index) => (
                <div
                  key={item.id}
                  className="menu-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MenuItemCard
                    item={item}
                    currencySymbol={getCurrencySymbol()}
                    convertPrice={convertPrice}
                    t={t}
                    darkMode={darkMode}
                    language={language}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="empty-title">{t("noResultsFound")}</h3>
              <p className="empty-text">{t("tryDifferentSearch")}</p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Components */}
      <CartDrawer
        cartItems={cart}
        currencySymbol={getCurrencySymbol()}
        convertPrice={convertPrice}
        t={t}
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={(id, quantity) => {
          setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
          );
        }}
        onRemoveItem={(id) => {
          const newCart = cart.filter((item) => item.id !== id);
          setCart(newCart);
          if (newCart.length === 0) {
            setCustomerInfo(null);
            localStorage.removeItem("customerInfo");
          }
        }}
        onCheckout={handleCheckoutClick}
        darkMode={darkMode}
        customerInfo={customerInfo}
      />

      <CartFloatingButton
        itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onClick={() => setCartDrawerOpen(true)}
        darkMode={darkMode}
      />

      <CartNotification
        item={lastAddedItem}
        isVisible={showMiniCart}
        onHide={() => setShowMiniCart(false)}
        currencySymbol={getCurrencySymbol()}
        convertPrice={convertPrice}
        t={t}
        darkMode={darkMode}
      />

      {/* ✅ CUSTOMER INFO MODAL */}
      {showCustomerModal && (
        <div className="modal-overlay" onClick={() => setShowCustomerModal(false)}>
          <div className="customer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-user-circle me-2"></i>
                Delivery Information
              </h2>
              <button
                className="close-modal"
                onClick={() => setShowCustomerModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <p className="text-muted mb-4">
                Please provide your delivery information to continue
              </p>

              <div className="form-group">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${formErrors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label>
                  Phone Number 1 <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone1"
                  className={`form-control ${formErrors.phone1 ? 'error' : ''}`}
                  placeholder="Enter primary phone number"
                  value={formData.phone1}
                  onChange={handleInputChange}
                />
                {formErrors.phone1 && <span className="error-message">{formErrors.phone1}</span>}
              </div>

              <div className="form-group">
                <label>
                  Phone Number 2 <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone2"
                  className={`form-control ${formErrors.phone2 ? 'error' : ''}`}
                  placeholder="Enter secondary phone number"
                  value={formData.phone2}
                  onChange={handleInputChange}
                />
                {formErrors.phone2 && <span className="error-message">{formErrors.phone2}</span>}
              </div>

              <div className="form-group">
                <label>
                  Phone Number 3 <span className="optional">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone3"
                  className={`form-control ${formErrors.phone3 ? 'error' : ''}`}
                  placeholder="Enter additional phone number (optional)"
                  value={formData.phone3}
                  onChange={handleInputChange}
                />
                {formErrors.phone3 && <span className="error-message">{formErrors.phone3}</span>}
              </div>

              <div className="form-group">
                <label>
                  Delivery Address <span className="required">*</span>
                </label>
                <textarea
                  name="address"
                  className={`form-control ${formErrors.address ? 'error' : ''}`}
                  placeholder="Enter your complete delivery address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.address && <span className="error-message">{formErrors.address}</span>}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowCustomerModal(false)}
              >
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleCustomerConfirm}>
                <i className="fas fa-check me-2"></i>
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}