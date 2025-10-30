// pages/Components/MenuePage.js - UPDATED WITH TABLE SELECTION
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
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
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

 
  // Custom hooks
  const { t } = useTranslation(language);
  const { convertPrice, getCurrencySymbol } = useCurrencyConverter(currency);

  const categories = [{ name: "all",namear:"الكل"  }, ...Category];

  const filteredMenu = product.filter((item) => {
    if (activeCategory !== "all" && item.category.name !== activeCategory)
      return false;
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())&&    
      !item.namear.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.descriptionar.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });
const getFilteredProductsByButton = (e) => {
  setButtonSelection(e);
 if (buttonSelection === "suggest") {
   console.log(product.filter(item => item.RestorantOption === false),"product------ ");
   setfiltershow( product.filter(item => item.RestorantOption === true))
  } else {
    console.log(product.length);
    setfiltershow( product)
    console.log(product,"product------ ");
    return product;
    }
}
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
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.body.classList.toggle("dark-mode", prefersDark);
      document.body.classList.toggle("light-mode", !prefersDark);
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
    <div className={ "dark-mode "  }>
      {/* <Head>
        <title>{t("pageTitle")}</title>
        <meta name="description" content={t("pageDescription")} />
      </Head> */}

      <nav
        className={`navbar navbar-expand ${
          darkMode ? "navbar-dark" : ""
        } sticky-top shadow-sm`}
        style={{
          background: "linear-gradient(135deg, #8f8e8c 0%, #454543 100%)",
          padding: "12px 0",
        }}
      >
        <div className="container py-1">
          <a className="navbar-brand d-flex align-items-center" href="#">
 
            <span
              className="fw-bold"
              style={{
                background: "linear-gradient(45deg, #b4361f, #d35a3d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.6rem",
                letterSpacing: "0.5px",
              }}
            >
              <Image src={logo} height={50} width={50}/>
            </span>
          </a>

          <div className="ms-auto d-flex align-items-center gap-2">


            {/* Language Selector */}
            <div className="position-relative">
              <button
                className="language-selector btn btn-sm d-flex align-items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #b4361f, #d35a3d)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(180, 54, 31, 0.3)",
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
                    backgroundColor: "#2d2d2d",
                    border: "1px solid #b4361f",
                    padding: "0.5rem",
                    animation: "fadeSlideIn 0.3s ease",
                    transformOrigin:
                      language === "ar" ? "top left" : "top right",
                    boxShadow: "0 10px 30px rgba(180, 54, 31, 0.3)",
                  }}
                >
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
                        background:
                          language === lang.code
                            ? "linear-gradient(135deg, #b4361f, #d35a3d)"
                            : "transparent",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
        <div className="position-relative">
              <Link
                className="currency-selector btn btn-sm d-flex align-items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #b4361f, #d35a3d)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(180, 54, 31, 0.3)",
                  height: "40px",
                }}
      href = "/reviewpage"
              >
           {t("review")}
              </Link>
            </div>

            {/* Dark Mode Toggle */}
            <button
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
              onClick={()=>{}}
              style={{
                width: "38px",
                height: "38px",
                background: "linear-gradient(135deg, #b4361f, #d35a3d)",
                border: "none",
                boxShadow: "0 4px 15px rgba(180, 54, 31, 0.3)",
              }}
            >
        < FaStar size={24} onClick={()=>setshowReviewsModal(true)} color="#ffffff"/>
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
                    language={language}
                    darkMode={darkMode}
             
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
 
    
              {showReviewsModal && (
        <div className="modal-overlay dark-mode" onClick={() => setshowReviewsModal(false)}>
          <div className="reviews-modal "     style={{
          background: darkMode
            ? "linear-gradient(135deg, #2d2d2d 0%, #454543 100%)"
            : "linear-gradient(135deg, #f0efee 0%, #e3e2e0 100%)",
        }} onClick={(e) => e.stopPropagation()} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="reviews-modal-header">
              <h2>
                <i className="fas fa-star"></i>
                {language === 'ar' ? 'الآكثر شيوعا' : 'The most common'}
              </h2>
              <button className="close-icon-btn" onClick={() => setshowReviewsModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="reviews-modal-content">
              <div className= "d-flex  button-modal">
            <button onClick={
            ()=>  getFilteredProductsByButton("suggest")
            }>
              <h1>{t("restorantOPtions")}</h1>
               
           
                <span className={buttonSelection!=="suggest"?"":"modal-button-animation"}></span>
            </button>
            <button onClick={
            ()=>  getFilteredProductsByButton("common")
            }>
              <h1>
                {t("common")}
              </h1>
                <span className={buttonSelection!=="common"?"":"modal-button-animation"}></span>
            </button>
          
                </div>
              {
            
            
                <div className={darkMode ? "dark-mode reviews-list" : "light-mode reviews-list" } >
                
                  {filtershow.filter(e=>e.bestseller==true).map((item, index) => {
                    console.log();
                            return  <div
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
                    darkMode={darkMode}
             
                  />
                </div>
})}
                </div>
              
            }
            </div>
          </div>
        </div>
      )}
 
    </div>
  );
}