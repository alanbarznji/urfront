export function useTranslation(language) {
  // Import all translation files
  const translations = {
    en: {
      // English translations (already provided in previous code)
      pageTitle: "Savory - Delicious Restaurant Menu",
      pageDescription: "Explore our delicious menu with a variety of options",
      ourMenu: "Our Menu",
      menuDescription:
        "Discover our chef's selection of delicious dishes made with fresh ingredients",
      menu: "Menu",
      about: "About",
      contact: "Contact",
      order: "Order Now",
      addToCart: "Add to Cart",
      bestseller: "Bestseller",
      new: "New",
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      glutenFree: "Gluten Free",
      spicy: "Spicy",
      categories: {
        all: "All",
        burgers: "Burgers",
        sandwiches: "Sandwiches",
        pizzas: "Pizzas",
        salads: "Salads",
        desserts: "Desserts",
        drinks: "Drinks",
        sides: "Sides",
        mains: "Mains",
      },
      review: "Review Us Here",
      menu: "Menu",
      restorantOPtions: "Restaurant Options",
      common:" Common",
      // ...rest of translations
    },
 
    ar: {
      // Arabic translations
      pageTitle: "سافوري - قائمة طعام شهية",
      pageDescription:
        "استكشف قائمة طعامنا الشهية مع مجموعة متنوعة من الخيارات",
      ourMenu: "قائمتنا",
      menuDescription:
        "اكتشف تشكيلة الأطباق اللذيذة من الشيف المصنوعة من مكونات طازجة",
      menu: "القائمة",
      about: "عنا",
      contact: "اتصل",
      order: "اطلب الآن",
      addToCart: "أضف للسلة",
      bestseller: "الأكثر مبيعاً",
      new: "جديد",
      vegetarian: "نباتي",
      vegan: "نباتي صرف",
      glutenFree: "خالي من الغلوتين",
      spicy: "حار",
      categories: {
        all: "الكل",
        burgers: "برجر",
        sandwiches: "سندويشات",
        pizzas: "بيتزا",
        salads: "سلطات",
        desserts: "حلويات",
        drinks: "مشروبات",
        sides: "أطباق جانبية",
        mains: "أطباق رئيسية",
      },
      pageTitle: "نحن نقدر رأيك!",
      pageSubtitle:
        "يرجى تعبئة هذا الاستبيان لمساعدتنا على تحسين تجربتك في مطعم أور",
      customerService: "1. تقييمك لخدمة الزبائن:",
      foodTaste: "2. تقييمك لطعم الأكل:",
      cleanliness: "3. تقييمك لنظافة المطعم:",
      atmosphere: "4. تقييمك لأجواء المطعم:",
      atmosphereDetails: "(الديكور، الموسيقى، الإضاءة)",
      newDishes: "5. هل ترغب بإضافة نوع جديد من الأطعمة؟",
      suggestions: "6. هل لديك أي ملاحظات أو اقتراحات لتحسين تجربتك:",
      favoriteThings: "7. ما أكثر شيء أعجبك في المطعم:",
      recommend: "8. هل تنصح الآخرين بتجربة مطعم أور؟",
      excellent: "ممتاز",
      veryGood: "جيد جداً",
      good: "جيد",
      poor: "ضعيف",
      yes: "نعم",
      no: "لا",
      submit: "إرسال التقييم",
      thankYou: "شكراً لك!",
      successMessage: "تم إرسال تقييمك بنجاح. نحن نقدر وقتك!",
      requiredField: "يرجى الإجابة على جميع أسئلة التقييم",
      close: "إغلاق",
      review: "قيمنا هنا",
      menu: "القائمة",
      restorantOPtions: "خيارات المطعم",
      common:" شائع",
      // ...rest of translations
    },
    // Add more languages as needed
  };
  
  // Translation function
  const t = (key) => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Start with the translations for the current language
    let value = translations[language];
    
    // Navigate through the nested properties
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if the key is not found
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key; // Return the key if not found in fallback
          }
        }
        return fallback;
      }
    }
    
    return value;
  };
  
  return { t };
}
