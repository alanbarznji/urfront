import { GetReviewAction, InsertReviewAction } from '@/Redux/Action/ReviewAction';
import { useTranslation } from '@/src/data/useTranslation';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../pages/assets/Logo.png";
import Image from 'next/image';
export default function ReviewPage() {
  const [language, setLanguage] = useState('en');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  // const [allReviews, setAllReviews] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  // const [language, setLanguage] = useState("en");
 const dispatch=useDispatch()
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

 
  // Custom hooks
  const { t } = useTranslation(language);
 useEffect(() => {
  dispatch(GetReviewAction())
 },[])
const allReviews=useSelector(state=>state.Review.Review)
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

   

 
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  }, [language]);

  // Load reviews when modal opens
  const loadReviews = () => {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    // setAllReviews(reviews);
    setShowReviewsModal(true);
  };

  const getRatingLabel = (value) => {
    const labels = {
      excellent: t('excellent'),
      veryGood: t('veryGood'),
      good: t('good'),
      poor: t('poor')
    };
    return labels[value] || value;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
 
  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0];
  };
 

  const [formData, setFormData] = useState({
    customerService: '',
    foodTaste: '',
    cleanliness: '',
    atmosphere: '',
    newDishes: '',
    suggestions: '',
    favoriteThings: '',
    recommend: ''
  });

  const ratingOptions = [
    { value: 'excellent', label: t('excellent') },
    { value: 'veryGood', label: t('veryGood') },
    { value: 'good', label: t('good') },
    { value: 'poor', label: t('poor') }
  ];

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Validation
    if (!formData.customerService || !formData.foodTaste || 
        !formData.cleanliness || !formData.atmosphere) {
      alert(t('requiredField'));
      return;
    }

    // Store review in localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push({
      ...formData,
      timestamp: new Date().toISOString(),
      language: language
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    formData.recommend=formData.recommend==='yes'?true:false
dispatch(InsertReviewAction(
  
formData.customerService,
formData.foodTaste,
formData.ratingambience,
formData.cleanliness,
formData.newDishes,
formData.favoriteThings,
formData.recommend,
formData.suggestions,
formData.atmosphere,
 
))
    // Show success message
    setShowSuccess(true);
    
    // // Reset form
    // setFormData({
    //   customerService: '',
    //   foodTaste: '',
    //   cleanliness: '',
    //   atmosphere: '',
    //   newDishes: '',
    //   suggestions: '',
    //   favoriteThings: '',
    //   recommend: ''
    // });
  };

  return (
    <div className="review-page" dir={language === 'ar' ? 'rtl' : 'ltr'} style={{padding:0}}>
      <nav
        className={`navbar navbar-expand ${
          darkMode ? "navbar-dark" : "navbar-light"
        } sticky-top shadow-sm`}
        style={{
          background:  "navbar-dark",
    
          padding: "12px 0",
        }}
      >
        <div className="container py-1">
            <a className="navbar-brand d-flex align-items-center" href="#">
 
            <span
              className="fw-bold"
              style={{
                background: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
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
                  background:  "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
              
                  border:  
                   "1px solid linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
 
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
                    background: darkMode ? "#2f2f2f" : "white",
                    border: darkMode ? "1px solid #444" : "1px solid #ddd",
                    padding: "0.5rem",
                    animation: "fadeSlideIn 0.3s ease",
                    transformOrigin:
                      language === "ar" ? "top left" : "top right",
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
                            ? "linear-gradient(135deg, #f44336 0%, #e91e63 100%)"
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

          
            <div className="position-relative">
              <Link
                className="currency-selector btn btn-sm d-flex align-items-center gap-2"
                style={{
                  background:   "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                  
                  border:   "1px solid linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                   
                  color: "white",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  height: "40px",
                }}
                 href = "/menuepage"
              
              >
           {t("menu")}
              </Link>

 
            </div>

            {/* View Reviews Button */}
            <button
              className="btn btn-sm d-flex align-items-center gap-2"
              onClick={loadReviews}
              style={{
                background: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                border: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                color: darkMode ? "#ffffff" : "#333333",
                borderRadius: "20px",
                padding: "8px 16px",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                height: "40px",
              }}
            >
              <i className="fas fa-list"></i>
              <span className="d-none d-md-inline">
                {language === 'ar' ? 'عرض التقييمات' : 'View Reviews'}
              </span>
            </button>

        
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="review-header">
        <div className="logo">
          <svg viewBox="0 0 200 100" className="logo-svg">
            <polygon points="20,80 50,20 80,80" fill="currentColor"/>
            <polygon points="70,80 100,20 130,80" fill="currentColor"/>
            <polygon points="120,80 150,20 180,80" fill="currentColor"/>
          </svg>
        </div>
        <h1>{t('pageTitle')}</h1>
        <p>{t('pageSubtitle')}</p>
      </div>

      {/* Review Form */}
      <form className="review-form" onSubmit={handleSubmit}>
        {/* Question 1: Customer Service */}
        <div className="question-block">
          <h3>{t('customerService')}</h3>
          <div className="rating-options">
            {ratingOptions.map(option => (
              <label key={option.value} className="rating-option">
                <input
                  type="radio"
                  name="customerService"
                  value={option.value}
                  checked={formData.customerService === option.value}
                  onChange={(e) => handleRatingChange('customerService', e.target.value)}
                />
                <span className="rating-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 2: Food Taste */}
        <div className="question-block">
          <h3>{t('foodTaste')}</h3>
          <div className="rating-options">
            {ratingOptions.map(option => (
              <label key={option.value} className="rating-option">
                <input
                  type="radio"
                  name="foodTaste"
                  value={option.value}
                  checked={formData.foodTaste === option.value}
                  onChange={(e) => handleRatingChange('foodTaste', e.target.value)}
                />
                <span className="rating-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 3: Cleanliness */}
        <div className="question-block">
          <h3>{t('cleanliness')}</h3>
          <div className="rating-options">
            {ratingOptions.map(option => (
              <label key={option.value} className="rating-option">
                <input
                  type="radio"
                  name="cleanliness"
                  value={option.value}
                  checked={formData.cleanliness === option.value}
                  onChange={(e) => handleRatingChange('cleanliness', e.target.value)}
                />
                <span className="rating-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 4: Atmosphere */}
        <div className="question-block">
          <h3>
            {t('atmosphere')}
            <span className="subtitle">{t('atmosphereDetails')}</span>
          </h3>
          <div className="rating-options">
            {ratingOptions.map(option => (
              <label key={option.value} className="rating-option">
                <input
                  type="radio"
                  name="atmosphere"
                  value={option.value}
                  checked={formData.atmosphere === option.value}
                  onChange={(e) => handleRatingChange('atmosphere', e.target.value)}
                />
                <span className="rating-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 5: New Dishes */}
        <div className="question-block">
          <h3>{t('newDishes')}</h3>
          <textarea
            className="text-input"
            rows="3"
            value={formData.newDishes}
            onChange={(e) => handleInputChange('newDishes', e.target.value)}
            placeholder={language === 'ar' ? 'اكتب اقتراحاتك هنا...' : 'Write your suggestions here...'}
          />
        </div>

        {/* Question 6: Suggestions */}
        <div className="question-block">
          <h3>{t('suggestions')}</h3>
          <textarea
            className="text-input"
            rows="4"
            value={formData.suggestions}
            onChange={(e) => handleInputChange('suggestions', e.target.value)}
            placeholder={language === 'ar' ? 'شاركنا ملاحظاتك...' : 'Share your feedback...'}
          />
        </div>

        {/* Question 7: Favorite Things */}
        <div className="question-block">
          <h3>{t('favoriteThings')}</h3>
          <textarea
            className="text-input"
            rows="3"
            value={formData.favoriteThings}
            onChange={(e) => handleInputChange('favoriteThings', e.target.value)}
            placeholder={language === 'ar' ? 'أخبرنا ما أعجبك...' : 'Tell us what you liked...'}
          />
        </div>

        {/* Question 8: Recommend */}
        <div className="question-block">
          <h3>{t('recommend')}</h3>
          <div className="yes-no-options">
            <label className="yes-no-option">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={formData.recommend === 'yes'}
                onChange={(e) => handleRatingChange('recommend', e.target.value)}
              />
              <span className="yes-no-label">{t('yes')}</span>
            </label>
            <label className="yes-no-option">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={formData.recommend === 'no'}
                onChange={(e) => handleRatingChange('recommend', e.target.value)}
              />
              <span className="yes-no-label">{t('no')}</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          <span>{t('submit')}</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>{t('thankYou')}</h2>
            <p>{t('successMessage')}</p>
            <button className="close-btn" onClick={() => setShowSuccess(false)}>
              {t('close')}
            </button>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="modal-overlay"  onClick={() => setShowReviewsModal(false)}>
          <div className="reviews-modal" style={{
          background:   "linear-gradient(135deg, #252018 0%, #3d3128 100%)"
          
        }}
        onClick={(e) => e.stopPropagation()} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="reviews-modal-header">
              <h2>
                <i className="fas fa-star"></i>
                {language === 'ar' ? 'جميع التقييمات' : 'All Reviews'}
              </h2>
              <button className="close-icon-btn" onClick={() => setShowReviewsModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="reviews-modal-content">
              {allReviews.length === 0 ? (
                <div className="no-reviews">
                  <i className="fas fa-inbox"></i>
                  <p>{language === 'ar' ? 'لا توجد تقييمات بعد' : 'No reviews yet'}</p>
                </div>
              ) : (
                <div className="reviews-list">
                  {allReviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="review-card-header">
                        <div className="review-number">
                          {language === 'ar' ? `تقييم #${allReviews.length - index}` : `Review #${allReviews.length - index}`}
                        </div>
                        <div className="review-date">{formatDate(review.timestamp)}</div>
                      </div>
                      
                      <div className="review-ratings">
                        <div className="rating-row">
                          <span className="rating-label-text">
                            {language === 'ar' ? 'خدمة العملاء:' : 'Customer Service:'}
                          </span>
                          <span className="rating-value">{getRatingLabel(review.customerService)}</span>
                        </div>
                        <div className="rating-row">
                          <span className="rating-label-text">
                            {language === 'ar' ? 'طعم الطعام:' : 'Food Taste:'}
                          </span>
                          <span className="rating-value">{getRatingLabel(review.foodTaste)}</span>
                        </div>
                        <div className="rating-row">
                          <span className="rating-label-text">
                            {language === 'ar' ? 'النظافة:' : 'Cleanliness:'}
                          </span>
                          <span className="rating-value">{getRatingLabel(review.cleanliness)}</span>
                        </div>
                        <div className="rating-row">
                          <span className="rating-label-text">
                            {language === 'ar' ? 'الأجواء:' : 'Atmosphere:'}
                          </span>
                          <span className="rating-value">{getRatingLabel(review.atmosphere)}</span>
                        </div>
                      </div>

                      {review.newDishes && (
                        <div className="review-text-field">
                          <strong>{language === 'ar' ? 'أطباق جديدة مقترحة:' : 'New Dishes Suggestions:'}</strong>
                          <p>{review.newDishes}</p>
                        </div>
                      )}

                      {review.suggestions && (
                        <div className="review-text-field">
                          <strong>{language === 'ar' ? 'اقتراحات للتحسين:' : 'Improvement Suggestions:'}</strong>
                          <p>{review.suggestions}</p>
                        </div>
                      )}

                      {review.favoriteThings && (
                        <div className="review-text-field">
                          <strong>{language === 'ar' ? 'الأشياء المفضلة:' : 'Favorite Things:'}</strong>
                          <p>{review.favoriteThings}</p>
                        </div>
                      )}

                      {review.recommend && (
                        <div className="review-recommend">
                          <span className="recommend-label">
                            {language === 'ar' ? 'يوصي بالمطعم:' : 'Recommends:'}
                          </span>
                          <span className={`recommend-badge ${review.recommend}`}>
                            {review.recommend === true 
                              ? (language === 'ar' ? 'نعم ✓' : 'Yes ✓')
                              : (language === 'ar' ? 'لا ✗' : 'No ✗')
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
 
    </div>
  );
}
