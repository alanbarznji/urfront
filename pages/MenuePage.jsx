// pages/Components/MenuePage.js - UPDATED WITH ORDER SYSTEM
import { useState, useEffect } from "react";
import Head from "next/head";
import CategorySlider from "./Components/CategorySlider";
import MenuItemCard from "./Components/MenuItemCard";
import { useTranslation } from "../src/data/useTranslation";
import { useCurrencyConverter } from "../src/data/useCurrencyConverter";
import { menuData } from "../src/data/menuData";
import CartDrawer from "./Components/CartDrawer";
import CartFloatingButton from "./Components/CartFloatingButton";
import CartNotification from "./Components/CartNotification";
// import OrderTypeModal from "./Components/OrderTypeModal"; // ✅ NEW IMPORT
  import { useDispatch, useSelector } from "react-redux";
import { GetProductAction } from "@/Redux/Action/ProductAction";
import { GetCategoryAction } from "@/Redux/Action/CategoryAction";

export default function MenuePage() {
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

  // ✅ NEW STATE FOR ORDER SYSTEM
  const [orderType, setOrderType] = useState(null);
  const [showOrderTypeModal, setShowOrderTypeModal] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
const dispatch = useDispatch();
  useEffect(() => {
dispatch(GetProductAction())
dispatch(GetCategoryAction())
  }, []);
const product=useSelector((state)=>state.Product.Product)
const Category=useSelector((state)=>state.Category.Category)
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
 
  const handleAddToCart = (item) => {
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

  // ✅ NEW HANDLER FOR ORDER TYPE SELECTION
  const handleOrderTypeSelect = (type) => {
    setOrderType(type);
    localStorage.setItem("orderType", type);
    setShowOrderTypeModal(false);
  };

  // ✅ NEW CHECKOUT HANDLER
  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    setShowCheckoutForm(true);
  };

  // ✅ NEW ORDER SUBMISSION HANDLER
  const handleOrderSubmit = (customerData) => {
    const order = {
      id: Date.now(),
      orderNumber: `ORD-${Date.now()}`,
      type: orderType,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "pending",
      time: new Date().toISOString(),
      customerName: customerData.name,
      phone: customerData.phone,
      address: customerData.address,
      tableNumber: customerData.tableNumber,
      notes: customerData.notes,
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart and close modals
    setCart([]);
    setShowCheckoutForm(false);

    // Show success message
    alert(
      `Order ${order.orderNumber} placed successfully! Your order will be ${
        orderType === "delivery" ? "delivered" : "ready at your table"
      } soon.`
    );
  };

  // Custom hooks
  const { t } = useTranslation(language);
  const { convertPrice, getCurrencySymbol } = useCurrencyConverter(currency);

  const categories = [ {name:"all"},  ...new Set(Category.map((item) => item))];

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

  // Close dropdowns when clicking outside
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

console.log(product,Category);
  // ✅ UPDATED USEEFFECT WITH ORDER TYPE CHECK
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      const isDarkMode = storedDarkMode === "true";
      setDarkMode(isDarkMode);
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.body.classList.toggle("light-mode", !isDarkMode);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
      document.body.classList.toggle("dark-mode", prefersDark);
      document.body.classList.toggle("light-mode", !prefersDark);
    }

    const storedLanguage = localStorage.getItem("language");
    const storedOrderType = localStorage.getItem("orderType"); // ✅ NEW

    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setShowLanguageModal(true);
    }

    // ✅ CHECK FOR ORDER TYPE
    if (storedOrderType) {
      setOrderType(storedOrderType);
    } else {
      // Show order type modal after a small delay
      setTimeout(() => {
        setShowOrderTypeModal(true);
      }, 500);
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
      <Head>
        <title>{t("pageTitle")}</title>
        <meta name="description" content={t("pageDescription")} />
      </Head>

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
              className="fas fa-utensils me-2"
              style={{
                color: "linear-gradient(45deg, #b87333, #8c5425)",
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
              UR
            </span>
          </a>

          <div className="ms-auto d-flex align-items-center gap-2">
            {/* ✅ ORDER TYPE INDICATOR */}
            {orderType && (
              <div className="order-type-indicator">
                <i
                  className={`fas ${
                    orderType === "delivery" ? "fa-motorcycle" : "fa-store"
                  }`}
                ></i>
                <span className="d-none d-md-inline">
                  {orderType === "delivery" ? "Delivery" : "Dine In"}
                </span>
                <button
                  className="change-type-btn"
                  onClick={() => setShowOrderTypeModal(true)}
                  title="Change order type"
                >
                  <i className="fas fa-sync-alt"></i>
                </button>
              </div>
            )}

            {/* Language Selector */}
            <div className="position-relative">
              <button
                className="language-selector btn btn-sm d-flex align-items-center gap-2"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  color: "var(--text-color)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  height: "40px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageDropdown(!showLanguageDropdown);
                  setShowCurrencyDropdown(false);
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>
                  {getCurrentLanguage()?.flag}
                </span>
                <span
                  className="d-none d-md-inline"
                  style={{ fontWeight: "500" }}
                >
                  {getCurrentLanguage()?.name}
                </span>
                <i
                  className="fas fa-chevron-down ms-1"
                  style={{ fontSize: "0.7rem" }}
                ></i>
              </button>

              {showLanguageDropdown && (
                <div
                  className="language-dropdown position-absolute mt-2 shadow-lg rounded-3 z-1 custom-dropdown"
                  style={{
                    minWidth: "220px",
                    [language === "ar" ? "left" : "right"]: 0,
                    backgroundColor: darkMode ? "#2a2a2a" : "white",
                    border: darkMode ? "1px solid #444" : "1px solid #ddd",
                    padding: "0.5rem",
                    animation: "fadeSlideIn 0.3s ease",
                    transformOrigin:
                      language === "ar" ? "top left" : "top right",
                  }}
                >
                  <div
                    className="dropdown-header pb-2 mb-2"
                    style={{
                      borderBottom: darkMode
                        ? "1px solid #444"
                        : "1px solid #eee",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        color: darkMode ? "#ccc" : "#666",
                      }}
                    >
                      {t("selectLanguage")}
                    </span>
                  </div>

                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={`dropdown-item-custom d-flex align-items-center gap-2 mb-1 ${
                        language === lang.code ? "active" : ""
                      }`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        backgroundColor:
                          language === lang.code
                            ? darkMode
                              ? "rgba(255, 126, 95, 0.2)"
                              : "rgba(255, 107, 107, 0.1)"
                            : "transparent",
                        border:
                          language === lang.code
                            ? darkMode
                              ? "1px solid rgba(255, 126, 95, 0.4)"
                              : "1px solid rgba(255, 107, 107, 0.3)"
                            : "1px solid transparent",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.2rem",
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {lang.flag}
                      </span>
                      <div className="d-flex flex-column">
                        <span
                          style={{
                            fontWeight: language === lang.code ? "600" : "500",
                            color: darkMode
                              ? language === lang.code
                                ? "#ff7e5f"
                                : "#eee"
                              : language === lang.code
                              ? "#ff6b6b"
                              : "#333",
                          }}
                        >
                          {lang.name}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            opacity: language === lang.code ? "1" : "0.7",
                            color: darkMode ? "#999" : "#777",
                          }}
                        >
                          {lang.code.toUpperCase()}
                        </span>
                      </div>
                      {language === lang.code && (
                        <i
                          className="fas fa-check ms-auto"
                          style={{
                            color: darkMode ? "#d4a76a" : "#b87333",
                            fontSize: "0.8rem",
                          }}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
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
                  e.stopPropagation();
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowLanguageDropdown(false);
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    width: "18px",
                    display: "inline-block",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {getCurrentCurrency()?.symbol}
                </span>
                <span
                  className="d-none d-md-inline"
                  style={{ fontWeight: "500" }}
                >
                  {getCurrentCurrency()?.code}
                </span>
                <i
                  className="fas fa-chevron-down ms-1"
                  style={{ fontSize: "0.7rem" }}
                ></i>
              </button>

              {showCurrencyDropdown && (
                <div
                  className="currency-dropdown position-absolute mt-2 shadow-lg rounded-3 z-1 custom-dropdown"
                  style={{
                    minWidth: "220px",
                    [language === "ar" ? "left" : "right"]: 0,
                    backgroundColor: darkMode ? "#2a2a2a" : "white",
                    border: darkMode ? "1px solid #444" : "1px solid #ddd",
                    padding: "0.5rem",
                    animation: "fadeSlideIn 0.3s ease",
                    transformOrigin:
                      language === "ar" ? "top left" : "top right",
                  }}
                >
                  <div
                    className="dropdown-header pb-2 mb-2"
                    style={{
                      borderBottom: darkMode
                        ? "1px solid #444"
                        : "1px solid #eee",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        color: darkMode ? "#ccc" : "#666",
                      }}
                    >
                      {t("selectCurrency")}
                    </span>
                  </div>

                  {currencies.map((curr) => (
                    <div
                      key={curr.code}
                      className={`dropdown-item-custom d-flex align-items-center gap-2 mb-1 ${
                        currency === curr.code ? "active" : ""
                      }`}
                      onClick={() => {
                        setCurrency(curr.code);
                        setShowCurrencyDropdown(false);
                      }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        backgroundColor:
                          currency === curr.code
                            ? darkMode
                              ? "rgba(255, 126, 95, 0.2)"
                              : "rgba(255, 107, 107, 0.1)"
                            : "transparent",
                        border:
                          currency === curr.code
                            ? darkMode
                              ? "1px solid rgba(255, 126, 95, 0.4)"
                              : "1px solid rgba(255, 107, 107, 0.3)"
                            : "1px solid transparent",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          width: "24px",
                          textAlign: "center",
                          background:
                            currency === curr.code
                              ? darkMode
                                ? "rgba(255, 126, 95, 0.3)"
                                : "rgba(255, 107, 107, 0.2)"
                              : darkMode
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.05)",
                          borderRadius: "50%",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {curr.symbol}
                      </span>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-1">
                          <span
                            style={{
                              fontWeight:
                                currency === curr.code ? "600" : "500",
                              color: darkMode
                                ? currency === curr.code
                                  ? "#ff7e5f"
                                  : "#eee"
                                : currency === curr.code
                                ? "#ff6b6b"
                                : "#333",
                            }}
                          >
                            {curr.code}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            opacity: currency === curr.code ? "1" : "0.7",
                            color: darkMode ? "#999" : "#777",
                          }}
                        >
                          {curr.name}
                        </span>
                      </div>
                      {currency === curr.code && (
                        <i
                          className="fas fa-check ms-auto"
                          style={{
                            color: darkMode ? "#ff7e5f" : "#ff6b6b",
                            fontSize: "0.8rem",
                          }}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                border: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
                color: darkMode ? "#ffffff" : "#333333",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
              <i className="fas fa-search search-icon" aria-hidden="true"></i>
              <input
                type="search"
                className="search-input"
                placeholder={t("searchMenu")}
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Search menu"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
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
              <button
                className="empty-button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                {t("clearFilters")}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Cart UI components */}
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
          setCart((prev) => prev.filter((item) => item.id !== id));
        }}
        onCheckout={handleCheckoutClick} // ✅ PASS CHECKOUT HANDLER
        darkMode={darkMode}
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
      {!showLanguageModal && (
        <div className="setup-modal-overlay">
          <div
            className={`setup-modal-content ${
              darkMode ? "dark" : "light"
            } d-flex`}
          >
            <div className="modal-header">
              <div className="brand-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h4 className="modal-title">
                {t("welcome") || "Welcome to UR!"}
              </h4>
            </div>

            <div className="modal-content-area">
              <div className="modal-section">
                <h6 className="section-title">
                  <i className="fas fa-globe-americas me-2"></i>
                  {t("selectLanguage") || "Select Language"}
                </h6>
                <div className="option-grid">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`option-btn ${
                        language === lang.code ? "active" : ""
                      }`}
                      onClick={() => setLanguage(lang.code)}
                    >
                      <span className="option-icon">{lang.flag}</span>
                      <div className="option-text">
                        <span className="option-name">{lang.name}</span>
                        <span className="option-code">
                          {lang.code.toUpperCase()}
                        </span>
                      </div>
                      {language === lang.code && (
                        <i className="fas fa-check check-icon"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h6 className="section-title">
                  <i className="fas fa-money-bill-wave me-2"></i>
                  {t("selectCurrency") || "Select Currency"}
                </h6>
                <div className="option-grid">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      className={`option-btn ${
                        currency === curr.code ? "active" : ""
                      }`}
                      onClick={() => setCurrency(curr.code)}
                    >
                      <span className="option-icon currency-icon">
                        {curr.symbol}
                      </span>
                      <div className="option-text">
                        <span className="option-name">{curr.code}</span>
                        <span className="option-code">{curr.name}</span>
                      </div>
                      {currency === curr.code && (
                        <i className="fas fa-check check-icon"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="confirm-btn rounded-4"
              onClick={() => {
                localStorage.setItem("language", language);
                localStorage.setItem("currency", currency);
                setShowLanguageModal(true);
              }}
            >
              <span>{t("continue") || "Continue"}</span>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ✅ NEW STYLES FOR ORDER TYPE INDICATOR */
        .order-type-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(184, 115, 51, 0.1);
          border: 1px solid rgba(184, 115, 51, 0.3);
          border-radius: 20px;
          font-weight: 600;
          color: var(--text-color);
          margin-right: 0.5rem;
          height: 40px;
        }

        .order-type-indicator i:first-child {
          color: #b87333;
          font-size: 1.2rem;
        }

        .change-type-btn {
          background: transparent;
          border: none;
          color: #b87333;
          cursor: pointer;
          padding: 0.25rem;
          margin-left: 0.5rem;
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .change-type-btn:hover {
          transform: rotate(180deg);
        }

        .language-dropdown .dropdown-item,
        .currency-dropdown .dropdown-item {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .language-dropdown .dropdown-item:hover,
        .currency-dropdown .dropdown-item:hover {
          background-color: ${darkMode ? "#3a3a3a" : "#f5f5f5"};
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          color: #888;
        }

        .search-input {
          width: 100%;
          padding: 12px 40px;
          border-radius: 30px;
          border: 1px solid ${darkMode ? "#444" : "#ddd"};
          background-color: ${darkMode ? "#222" : "#fff"};
          color: ${darkMode ? "#fff" : "#333"};
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
          border-color: #3b82f6;
        }

        .search-clear {
          position: absolute;
          right: 15px;
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
        }

        .dark-mode {
          background-color: #121212;
          color: #f5f5f5;
        }

        .light-mode {
          background-color: #ffffff;
          color: #333333;
        }

        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
