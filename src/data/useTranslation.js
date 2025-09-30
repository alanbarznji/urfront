export function useTranslation(language) {
  // Import all translation files
  const translations = {
    en: {
      // English translations (already provided in previous code)
      pageTitle: 'Savory - Delicious Restaurant Menu',
      pageDescription: 'Explore our delicious menu with a variety of options',
      ourMenu: 'Our Menu',
      menuDescription: 'Discover our chef\'s selection of delicious dishes made with fresh ingredients',
      menu: 'Menu',
      about: 'About',
      contact: 'Contact',
      order: 'Order Now',
      addToCart: 'Add to Cart',
      bestseller: 'Bestseller',
      new: 'New',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      glutenFree: 'Gluten Free',
      spicy: 'Spicy',
      categories: {
        all: 'All',
        burgers: 'Burgers',
        sandwiches: 'Sandwiches',
        pizzas: 'Pizzas',
        salads: 'Salads',
        desserts: 'Desserts',
        drinks: 'Drinks',
        sides: 'Sides',
        mains: 'Mains'
      },
      // ...rest of translations
    },
    es: {
      // Spanish translations
      pageTitle: 'Savory - Menú de Restaurante Delicioso',
      pageDescription: 'Explora nuestro delicioso menú con variedad de opciones',
      ourMenu: 'Nuestro Menú',
      menuDescription: 'Descubre la selección de platos deliciosos de nuestro chef hechos con ingredientes frescos',
      menu: 'Menú',
      about: 'Nosotros',
      contact: 'Contacto',
      order: 'Ordenar',
      addToCart: 'Añadir',
      bestseller: 'Popular',
      new: 'Nuevo',
      vegetarian: 'Vegetariano',
      vegan: 'Vegano',
      glutenFree: 'Sin Gluten',
      spicy: 'Picante',
      categories: {
        all: 'Todo',
        burgers: 'Hamburguesas',
        sandwiches: 'Sándwiches',
        pizzas: 'Pizzas',
        salads: 'Ensaladas',
        desserts: 'Postres',
        drinks: 'Bebidas',
        sides: 'Guarniciones',
        mains: 'Platos Principales'
      },
      // ...rest of translations
    },
    ar: {
      // Arabic translations
      pageTitle: 'سافوري - قائمة طعام شهية',
      pageDescription: 'استكشف قائمة طعامنا الشهية مع مجموعة متنوعة من الخيارات',
      ourMenu: 'قائمتنا',
      menuDescription: 'اكتشف تشكيلة الأطباق اللذيذة من الشيف المصنوعة من مكونات طازجة',
      menu: 'القائمة',
      about: 'عنا',
      contact: 'اتصل',
      order: 'اطلب الآن',
      addToCart: 'أضف للسلة',
      bestseller: 'الأكثر مبيعاً',
      new: 'جديد',
      vegetarian: 'نباتي',
      vegan: 'نباتي صرف',
      glutenFree: 'خالي من الغلوتين',
      spicy: 'حار',
      categories: {
        all: 'الكل',
        burgers: 'برجر',
        sandwiches: 'سندويشات',
        pizzas: 'بيتزا',
        salads: 'سلطات',
        desserts: 'حلويات',
        drinks: 'مشروبات',
        sides: 'أطباق جانبية',
        mains: 'أطباق رئيسية'
      },
      // ...rest of translations
    }
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
