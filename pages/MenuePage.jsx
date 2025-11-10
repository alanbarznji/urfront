// pages/Components/MenuePage.js - UPDATED DESIGN
import { useState, useEffect } from "react";
import Head from "next/head";
import CategorySlider from "./Components/CategorySlider";
import MenuItemCard from "./Components/MenuItemCard";
import { useTranslation } from "../src/data/useTranslation";
import { useCurrencyConverter } from "../src/data/useCurrencyConverter";
import logo from "../pages/assets/Logo.png";
import CartNotification from "./Components/CartNotification";
import { useDispatch, useSelector } from "react-redux";
import { GetProductAction } from "@/Redux/Action/ProductAction";
import { GetCategoryAction } from "@/Redux/Action/CategoryAction";
import { DeleteOrdersAction, InsertOrdersAction } from "@/Redux/Action/OrderAction";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function MenuePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("ar");
  const [currency, setCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewsModal, setshowReviewsModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [filtershow, setfiltershow] = useState([]);
  const [buttonSelection, setButtonSelection] = useState("common");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProductAction());
    dispatch(GetCategoryAction());
  }, []);

  const product = useSelector((state) => state.Product.Product);
  const Category = useSelector((state) => state.Category.Category);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const { t } = useTranslation(language);
  const { convertPrice, getCurrencySymbol } = useCurrencyConverter(currency);

  const categories = [{ name: "all", namear: "الكل" }, ...Category];

  const filteredMenu = product.filter((item) => {
    if (activeCategory !== "all" && item.category.name !== activeCategory)
      return false;
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.namear.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.descriptionar.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const getFilteredProductsByButton = (e) => {
    setButtonSelection(e);
    if (e === "suggest") {
      setfiltershow(product.filter((item) => item.RestorantOption === true));
    } else {
      setfiltershow(product);
    }
  };

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
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      const isDarkMode = storedDarkMode === "true";
      setDarkMode(isDarkMode);
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.body.classList.toggle("light-mode", !isDarkMode);
    } else {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setShowLanguageModal(true);
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

  return (
    <div className="dark-mode">
      <nav
        className="navbar navbar-expand sticky-top shadow-sm"
        style={{
          padding: "12px 0",
          backgroundColor: "#252018",
          borderBottom: "2px solid #d4a76a",
        }}
      >
        <div className="container py-1">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Image src={logo} height={50} width={50} />
 
          </a>

          <div className="ms-auto d-flex align-items-center gap-2">
            <div className="position-relative">
              <button
                className="language-selector btn btn-sm d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#d4a76a",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#252018",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  height: "40px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageDropdown(!showLanguageDropdown);
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>
                  {getCurrentLanguage()?.flag}
                </span>
                <span className="d-none d-md-inline" style={{ fontWeight: "500" }}>
                  {getCurrentLanguage()?.name}
                </span>
              </button>

              {showLanguageDropdown && (
                <div
                  className="language-dropdown position-absolute mt-2 shadow-lg rounded-3 z-1 custom-dropdown"
                  style={{
                    minWidth: "220px",
                    right: 0,
                    backgroundColor: "#2a2a2a",
                    border: "1px solid #d4a76a",
                    padding: "0.5rem",
                    animation: "fadeSlideIn 0.3s ease",
                  }}
                >
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className="dropdown-item-custom d-flex align-items-center gap-2 mb-1"
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        backgroundColor:
                          language === lang.code ? "#d4a76a" : "transparent",
                        color: language === lang.code ? "#252018" : "#f5f5f5",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => setshowReviewsModal(true)}
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: "#d4a76a",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaStar size={20} color="#252018" />
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content" style={{ backgroundColor: "#0f0f0f", minHeight: "90vh" }}>
        <div className="container py-5">
          {/* Search */}
          <div className="search-container mb-4">
            <div className="search-wrapper" role="search">
              <i className="fas fa-search search-icon"></i>
              <input
                type="search"
                className="search-input"
                placeholder={language === "ar" ? "ابحث في القائمة..." : "Search menu..."}
                value={searchQuery}
                onChange={handleSearch}
                style={{
                  backgroundColor: "#252018",
                  color: "#f5f5f5",
                  border: "2px solid #d4a76a",
                }}
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

          {/* Categories Horizontal Scroll */}
          <div className="category-slider-container mb-5">
            <div
              className="d-flex gap-3 overflow-auto pb-3"
              style={{
                borderRadius: "20px",
                padding: "15px",
                backgroundColor: "#1a1a1a",
                borderBottom: "3px solid #d4a76a",
              }}
            >
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className="category-badge-button"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "25px",
                    border: "2px solid",
                    backgroundColor:
                      activeCategory === category.name ? "#d4a76a" : "transparent",
                    borderColor:
                      activeCategory === category.name ? "#d4a76a" : "#666",
                    color:
                      activeCategory === category.name ? "#252018" : "#f5f5f5",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.name) {
                      e.target.style.borderColor = "#d4a76a";
                      e.target.style.color = "#d4a76a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.name) {
                      e.target.style.borderColor = "#666";
                      e.target.style.color = "#f5f5f5";
                    }
                  }}
                >
                  {language === "ar" ? category.namear : category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredMenu.length > 0 ? (
            <div
              className="menu-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
              }}
            >
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
                    language={language}
                    darkMode={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="empty-state"
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#d4a76a",
              }}
            >
              <i className="fas fa-search" style={{ fontSize: "3rem", marginBottom: "1rem" }}></i>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                {language === "ar" ? "لا توجد نتائج" : "No results found"}
              </h3>
              <p style={{ color: "#999" }}>
                {language === "ar"
                  ? "حاول البحث عن شيء آخر"
                  : "Try searching for something else"}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div
          className="modal-overlay dark-mode"
          onClick={() => setshowReviewsModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="reviews-modal"
            onClick={(e) => e.stopPropagation()}
            dir={language === "ar" ? "rtl" : "ltr"}
            style={{
              background: "linear-gradient(135deg, #252018 0%, #3d3128 100%)",
              borderRadius: "20px",
              padding: "2rem",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <div
              className="reviews-modal-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "2px solid #d4a76a",
              }}
            >
              <h2 style={{ color: "#d4a76a", margin: 0 }}>
                <i className="fas fa-star" style={{ marginRight: "0.5rem" }}></i>
                {language === "ar" ? "الأكثر شيوعا" : "Most Popular"}
              </h2>
              <button
                className="close-icon-btn"
                onClick={() => setshowReviewsModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d4a76a",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="d-flex button-modal mb-4" style={{ gap: "1rem" }}>
              <button
                onClick={() => getFilteredProductsByButton("suggest")}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor:
                    buttonSelection === "suggest" ? "#d4a76a" : "transparent",
                  color: buttonSelection === "suggest" ? "#252018" : "#f5f5f5",
                  border: `2px solid ${buttonSelection === "suggest" ? "#d4a76a" : "#666"}`,
                  borderRadius: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <h1 style={{ margin: 0, fontSize: "1rem" }}>
                  {language === "ar" ? "اختيار المطعم" : "Restaurant Choice"}
                </h1>
              </button>
              <button
                onClick={() => getFilteredProductsByButton("common")}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor:
                    buttonSelection === "common" ? "#d4a76a" : "transparent",
                  color: buttonSelection === "common" ? "#252018" : "#f5f5f5",
                  border: `2px solid ${buttonSelection === "common" ? "#d4a76a" : "#666"}`,
                  borderRadius: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <h1 style={{ margin: 0, fontSize: "1rem" }}>
                  {language === "ar" ? "الشائع" : "Common"}
                </h1>
              </button>
            </div>

            <div
              className="reviews-list"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtershow
                .filter((e) => e.bestseller === true)
                .map((item, index) => (
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
                      language={language}
                      darkMode={true}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}