/**
 * Safe localStorage utility functions with SSR guards and error handling
 */

/**
 * Check if localStorage is available (not in SSR environment)
 */
export const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage !== null;
  } catch {
    return false;
  }
};

/**
 * Safely get item from localStorage
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value if not found or error occurs
 * @returns {any} The stored value or defaultValue
 */
export const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    if (!isLocalStorageAvailable()) {
      return defaultValue;
    }

    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }

    // Try to parse as JSON
    try {
      return JSON.parse(item);
    } catch {
      // If parsing fails, return the raw string
      return item;
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} True if successful, false otherwise
 */
export const setLocalStorageItem = (key, value) => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }

    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} True if successful, false otherwise
 */
export const removeLocalStorageItem = (key) => {
  try {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Safely clear all localStorage items
 * @returns {boolean} True if successful, false otherwise
 */
export const clearLocalStorage = () => {
  try {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
