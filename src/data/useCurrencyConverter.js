export function useCurrencyConverter(currency) {
  // Currency conversion rates (simplified example)
  const currencyRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110.5,
    AED: 3.67
  };
  
  // Currency symbols
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AED: 'د.إ'
  };
  
  // Convert price based on selected currency
  const convertPrice = (priceUSD) => {
    const convertedPrice = priceUSD * currencyRates[currency];
    
    // Format based on currency
    if (currency === 'JPY') {
      return Math.round(convertedPrice);
    }
    return convertedPrice.toFixed(2);
  };
  
  // Get currency symbol
  const getCurrencySymbol = () => {
    return currencySymbols[currency] || '$';
  };
  
  return { convertPrice, getCurrencySymbol };
}