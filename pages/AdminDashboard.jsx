// pages/AdminDashboard.js  (أو نفس المسار الذي تستعمله)
// -- Admin Dashboard (fixed & hardened) --

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CheckAction } from "@/Redux/Action/AuthAction";
import {
  DeleteCategoryAction,
  GetCategoryAction,
  InsertCategoryAction,
  PutCategoryAction,
} from "@/Redux/Action/CategoryAction";
import {
  DeleteProductAction,
  GetProductAction,
  InsertProductAction,
  PutProductAction,
} from "@/Redux/Action/ProductAction";
import { DeleteReviewAction, GetReviewAction } from "@/Redux/Action/ReviewAction";

import { useTranslation } from "@/src/data/useTranslation";

// ---------- Helpers: storage-safe (iOS/Safari Private Mode) ----------
const safeGet = (k, fallback = null) => {
  try {
    if (typeof window === "undefined") return fallback;
    return localStorage.getItem(k) ?? fallback;
  } catch {
    return fallback;
  }
};
const safeSet = (k, v) => {
  try {
    if (typeof window !== "undefined") localStorage.setItem(k, v);
  } catch {}
};

// ---------- Component ----------
export default function AdminDashboard() {
  const dispatch = useDispatch();

  // UI state
  const [activeTab, setActiveTab] = useState("pending");
  const [activeSection, setActiveSection] = useState("menu"); // 'menu' | 'categories' | 'review'
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Auth token (optional flow)
  const [Token, setToken] = useState(null);

  // Theme & language
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  // New item/category forms
  const [newItem, setNewItem] = useState({
    name: "",
    namear: "",
    description: "",
    descriptionar: "",
    price: "",
    category: 1, // store id
    image: "",
    imageFile: null,
    imagePreview: null,
    bestseller: false,
    RestorantOption: false,
  });

  const [newCategory, setNewCategory] = useState({
    value: "",
    label: "",
    label_ar: "",
    icon: "fa-utensils",
  });

  // Selectors (defensive defaults)
  const menuItems = useSelector((s) => s?.Product?.Product) || [];
  const categories = useSelector((s) => s?.Category?.Category) || [];
  const review = useSelector((s) => s?.Review?.Review) || [];

  // Localization
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];
  const { t } = useTranslation(language);

  // ---------- Effects: bootstrapping ----------
  useEffect(() => {
    (async () => {
      try {
        const token = safeGet("Token");
        setToken(token);
      } catch {}
      if (!Token) dispatch(CheckAction());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Token]);

  useEffect(() => {
    // Initial data
    loadMenuItems();
    loadCategories();
    loadReviewsData();

    // Polling (optional): every 5s
    const interval = setInterval(() => {
      loadMenuItems();
      loadCategories();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme/Language init (safe)
  useEffect(() => {
    const storedDarkMode = safeGet("darkMode");
    if (storedDarkMode != null) {
      const isDark = storedDarkMode === "true";
      setDarkMode(isDark);
      if (typeof document !== "undefined") {
        document.body.classList.toggle("dark-mode", isDark);
        document.body.classList.toggle("light-mode", !isDark);
      }
    } else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      if (typeof document !== "undefined") {
        document.body.classList.toggle("dark-mode", prefersDark);
        document.body.classList.toggle("light-mode", !prefersDark);
      }
    }

    const storedLanguage = safeGet("language");
    if (storedLanguage) setLanguage(storedLanguage);
    // else could open language modal if you have one
  }, []);

  useEffect(() => {
    safeSet("language", language);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    }
  }, [language]);

  // ---------- Loaders ----------
  const loadMenuItems = () => {
    if (typeof window === "undefined") return;
    dispatch(GetProductAction());
    dispatch(GetReviewAction());
    // Optional: load any local customMenuItems if you need them
    // const storedItems = safeGet("customMenuItems");
  };

  const loadCategories = () => {
    dispatch(GetCategoryAction());
  };

  const loadReviewsData = () => {
    dispatch(GetReviewAction());
  };

  // ---------- UI helpers ----------
  const iconOptions = [
    "fa-utensils",
    "fa-hamburger",
    "fa-pizza-slice",
    "fa-bread-slice",
    "fa-leaf",
    "fa-ice-cream",
    "fa-glass-martini",
    "fa-french-fries",
    "fa-coffee",
    "fa-drumstick-bite",
    "fa-fish",
    "fa-cheese",
    "fa-hotdog",
    "fa-stroopwafel",
    "fa-cookie",
    "fa-apple-alt",
    "fa-carrot",
    "fa-pepper-hot",
    "fa-bacon",
    "fa-egg",
  ];

  const getCurrentLanguage = () =>
    languages.find((lang) => lang.code === language) || languages[0];

  const getRatingLabel = (value) => {
    const labels = {
      excellent: t("excellent"),
      veryGood: t("veryGood"),
      good: t("good"),
      poor: t("poor"),
    };
    return labels[value] || value;
  };

  // ---------- Actions: Items ----------
  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    setNewItem((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.description) {
      alert("Please fill in all required fields");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", newItem.name);
    formdata.append("namear", newItem.namear || "");
    formdata.append("price", String(newItem.price));
    formdata.append("description", newItem.description);
    formdata.append("descriptionar", newItem.descriptionar || "");
    formdata.append("categoryId", String(newItem.category));
    if (newItem.imageFile) formdata.append("image", newItem.imageFile);
    formdata.append("bestseller", String(newItem.bestseller));
    formdata.append("RestorantOption", String(newItem.RestorantOption));

    await dispatch(InsertProductAction(formdata));

    setNewItem({
      name: "",
      namear: "",
      description: "",
      descriptionar: "",
      price: "",
      category: categories[0]?.id || 1,
      image: "",
      imageFile: null,
      imagePreview: null,
      bestseller: false,
      RestorantOption: false,
    });
    setShowAddItemModal(false);
    alert("Item added successfully!");
  };

  const handleUpdateItem = async () => {
    if (!newItem?.id) return;
    if (!newItem.name || !newItem.price || !newItem.description) {
      alert("Please fill in all required fields");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", newItem.name);
    formdata.append("namear", newItem.namear || "");
    formdata.append("price", String(newItem.price));
    formdata.append("description", newItem.description);
    formdata.append("descriptionar", newItem.descriptionar || "");
    // category might be id or object:
    const categoryId =
      typeof newItem.category === "object" ? newItem.category?.id : newItem.category;
    formdata.append("categoryId", String(categoryId || ""));
    if (newItem.imageFile) formdata.append("image", newItem.imageFile);
    formdata.append("bestseller", String(newItem.bestseller));
    formdata.append("RestorantOption", String(newItem.RestorantOption));

    await dispatch(PutProductAction(newItem.id, formdata));

    setNewItem({
      name: "",
      namear: "",
      description: "",
      descriptionar: "",
      price: "",
      category: categories[0]?.id || 1,
      image: "",
      imageFile: null,
      imagePreview: null,
      bestseller: false,
      RestorantOption: false,
    });
    setEditingItem(null);
    setShowAddItemModal(false);
    alert("Item updated successfully!");
  };

  const handleDeleteItem = async (itemId) => {
    if (!itemId) return;
    if (confirm("Are you sure you want to delete this item?")) {
      await dispatch(DeleteProductAction(itemId));
      alert("Item deleted successfully!");
    }
  };

  // ---------- Actions: Categories ----------
  const slugify = (s) => (s || "").toLowerCase().trim().replace(/\s+/g, "-");

  const handleAddCategory = async () => {
    if (!newCategory.value || !newCategory.label) {
      alert("Please fill in category name");
      return;
    }
    if (categories.some((cat) => slugify(cat.name) === slugify(newCategory.value))) {
      alert("Category already exists!");
      return;
    }
    await dispatch(
      InsertCategoryAction(newCategory.value, newCategory.icon, newCategory.label_ar || "")
    );

    setNewCategory({ value: "", label: "", label_ar: "", icon: "fa-utensils" });
    setShowAddCategoryModal(false);
    alert("Category added successfully!");
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory?.id) return;
    await dispatch(
      PutCategoryAction(editingCategory.id, {
        namear: newCategory.label_ar,
        name: newCategory.value,
        icon: newCategory.icon,
      })
    );
    setEditingCategory(null);
    setShowAddCategoryModal(false);
    alert("Category updated successfully!");
  };

  const handleDeleteCategory = (categoryId) => {
    if (!categoryId) return;
    const itemsInCategory = menuItems.filter((item) => {
      const id =
        typeof item.category === "object" ? item.category?.id : item.category;
      return id === categoryId;
    });
    if (itemsInCategory.length > 0) {
      alert(
        `Cannot delete category. ${itemsInCategory.length} items are using this category. Please reassign or delete those items first.`
      );
      return;
    }
    if (confirm("Are you sure you want to delete this category?")) {
      dispatch(DeleteCategoryAction(categoryId));
      alert("Category deleted successfully!");
    }
  };

  // ---------- Actions: Reviews ----------
  const handleDeleteReview = async (id) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this item?")) {
      await dispatch(DeleteReviewAction(id));
      alert("Item deleted successfully!");
    }
  };

  // ---------- Theme toggle ----------
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (typeof document !== "undefined") {
      document.body.classList.toggle("dark-mode", next);
      document.body.classList.toggle("light-mode", !next);
    }
    safeSet("darkMode", next ? "true" : "false");
  };

  // ---------- Render ----------
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="brand-section">
            <i className="fas fa-utensils brand-icon"></i>
            <div>
              <h1>UR Dashboard</h1>
              <p>Complete Management System</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <i className="fas fa-utensils"></i>
              <div>
                <h3>{menuItems.length}</h3>
                <p>Menu Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-body">
        <div className="section-tabs">
          <button
            className={`section-tab ${activeSection === "menu" ? "active" : ""}`}
            onClick={() => setActiveSection("menu")}
          >
            <i className="fas fa-utensils"></i>
            Menu Items
          </button>

          <button
            className={`section-tab ${activeSection === "categories" ? "active" : ""}`}
            onClick={() => setActiveSection("categories")}
          >
            <i className="fas fa-th-large"></i>
            Categories
          </button>

          <button
            className={`section-tab ${activeSection === "review" ? "active" : ""}`}
            onClick={() => setActiveSection("review")}
          >
            <i className="fas fa-th-large"></i>
            Review
          </button>
        </div>

        {/* ========== Menu Items Section ========== */}
        {activeSection === "menu" && (
          <div className="menu-management">
            <div className="menu-header">
              <h2>Menu Items ({menuItems.length})</h2>
              <button
                className="btn-add-item"
                onClick={() => {
                  setEditingItem(null);
                  setNewItem({
                    name: "",
                    namear: "",
                    description: "",
                    descriptionar: "",
                    price: "",
                    category: categories[0]?.id || 1,
                    image: "",
                    imageFile: null,
                    imagePreview: null,
                    bestseller: false,
                    RestorantOption: false,
                  });
                  setShowAddItemModal(true);
                }}
              >
                <i className="fas fa-plus"></i>
                Add New Item
              </button>
            </div>

            <div className="menu-items-grid">
              {menuItems.map((item) => {
                // Normalize category
                const catId =
                  typeof item.category === "object" ? item.category?.id : item.category;
                const cat = categories.find((c) => c.id === catId);
                const img = item.imageUrl || item.image || null;

                return (
                  <div key={item.id} className="menu-item-card-admin">
                    <div className="menu-item-image">
                      {img ? (
                        <img src={img} alt={item.name || "item"} />
                      ) : (
                        <div className="placeholder-image">
                          <i className={`fas ${cat?.icon || "fa-utensils"}`}></i>
                        </div>
                      )}
                    </div>

                    <div className="menu-item-content">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-meta">
                        <span className="item-category">
                          <i className={`fas ${cat?.icon || "fa-utensils"}`}></i>
                          {cat?.name}
                        </span>
                        <span className="item-price">
                          ${Number(item.price ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="menu-item-actions">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditingItem(item);
                          setNewItem({
                            ...item,
                            category: catId, // ensure id
                            imageFile: null,
                            imagePreview: null,
                          });
                          setShowAddItemModal(true);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              {menuItems.length === 0 && (
                <div className="empty-state">
                  <i className="fas fa-utensils"></i>
                  <h3>No menu items yet</h3>
                  <p>Click "Add New Item" to create your first menu item</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== Categories Section ========== */}
        {activeSection === "categories" && (
          <div className="category-management">
            <div className="menu-header">
              <h2>Categories ({categories.length})</h2>
              <button
                className="btn-add-item"
                onClick={() => {
                  setEditingCategory(null);
                  setNewCategory({ value: "", label: "", label_ar: "", icon: "fa-utensils" });
                  setShowAddCategoryModal(true);
                }}
              >
                <i className="fas fa-plus"></i>
                Add New Category
              </button>
            </div>

            <div className="categories-grid">
              {categories.map((category) => {
                const itemCount = menuItems.filter((mi) => {
                  const id =
                    typeof mi.category === "object" ? mi.category?.id : mi.category;
                  return id === category.id;
                }).length;

                return (
                  <div key={category.id ?? category.value} className="category-card">
                    <div className="category-icon-large">
                      <i className={`fas ${category.icon}`}></i>
                    </div>
                    <div className="category-info">
                      <h3>{category.name}</h3>
                      <p className="category-value">{category.name}</p>
                      <p className="category-count">{itemCount} items</p>
                    </div>
                    <div className="category-actions">
                      <button
                        className="btn-edit-small"
                        onClick={() => {
                          setEditingCategory(category);
                          setNewCategory({
                            label: category.name,
                            label_ar: category.namear,
                            icon: category.icon,
                            value: category.name,
                          });
                          setShowAddCategoryModal(true);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete-small"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========== Review Section ========== */}
        {activeSection === "review" && (
          <div className="category-management">
            <div className="menu-header">
              <h2>review ({review.length})</h2>
            </div>

            <div className="reviews-list">
              {review.map((reviews, index) => (
                <div key={reviews.id ?? index} className="review-card">
                  <div className="review-card-header">
                    <div className="review-number">
                      {false ? `تقييم #${review.length - index}` : `Review #${review.length - index}`}
                    </div>

                    <div className="p-5" />
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteReview(reviews.id)}
                    >
                      <i className="fas fa-trash"></i>
                      Delete
                    </button>
                  </div>

                  <div className="review-ratings">
                    <div className="rating-row">
                      <span className="rating-label-text">
                        {false ? "خدمة العملاء:" : "Customer Service:"}
                      </span>
                      <span className="rating-value">{getRatingLabel(reviews.customerService)}</span>
                    </div>
                    <div className="rating-row">
                      <span className="rating-label-text">
                        {false ? "طعم الطعام:" : "Food Taste:"}
                      </span>
                      <span className="rating-value">{getRatingLabel(reviews.foodTaste)}</span>
                    </div>
                    <div className="rating-row">
                      <span className="rating-label-text">
                        {false ? "النظافة:" : "Cleanliness:"}
                      </span>
                      <span className="rating-value">{getRatingLabel(reviews.cleanliness)}</span>
                    </div>
                    <div className="rating-row">
                      <span className="rating-label-text">
                        {false ? "الأجواء:" : "Atmosphere:"}
                      </span>
                      <span className="rating-value">{getRatingLabel(reviews.atmosphere)}</span>
                    </div>
                  </div>

                  {reviews.newDishes && (
                    <div className="review-text-field">
                      <strong>{false ? "أطباق جديدة مقترحة:" : "New Dishes Suggestions:"}</strong>
                      <p>{reviews.newDishes}</p>
                    </div>
                  )}

                  {reviews.suggestions && (
                    <div className="review-text-field">
                      <strong>{false ? "اقتراحات للتحسين:" : "Improvement Suggestions:"}</strong>
                      <p>{reviews.suggestions}</p>
                    </div>
                  )}

                  {reviews.favoriteThings && (
                    <div className="review-text-field">
                      <strong>{false ? "الأشياء المفضلة:" : "Favorite Things:"}</strong>
                      <p>{reviews.favoriteThings}</p>
                    </div>
                  )}

                  {typeof reviews.recommend !== "undefined" && (
                    <div className="review-recommend">
                      <span className="recommend-label">
                        {false ? "يوصي بالمطعم:" : "Recommends:"}
                      </span>
                      <span className={`recommend-badge ${reviews.recommend ? "yes" : "no"}`}>
                        {reviews.recommend ? (false ? "نعم ✓" : "Yes ✓") : (false ? "لا ✗" : "No ✗")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------- Add/Edit Item Modal ---------- */}
      {showAddItemModal && (
        <div className="modal-overlay" onClick={() => setShowAddItemModal(false)}>
          <div className="add-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h2>
              <button className="close-modal" onClick={() => setShowAddItemModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Item Name (English) *</label>
                  <input
                    type="text"
                    placeholder="e.g., Classic Burger"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Item Name (Arabic) - اسم المنتج</label>
                  <input
                    type="text"
                    placeholder="مثال: برجر كلاسيكي"
                    value={newItem.namear}
                    onChange={(e) => setNewItem({ ...newItem, namear: e.target.value })}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description (English) *</label>
                <textarea
                  placeholder="Describe your item..."
                  rows={3}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description (Arabic) - الوصف</label>
                <textarea
                  placeholder="اكتب وصف المنتج..."
                  rows={3}
                  value={newItem.descriptionar}
                  onChange={(e) => setNewItem({ ...newItem, descriptionar: e.target.value })}
                  dir="rtl"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: Number(e.target.value) })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Item Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="file-input-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    Choose Image
                  </label>

                  {(newItem.imagePreview || newItem.image) && (
                    <div className="image-preview">
                      <img
                        src={newItem.imagePreview || newItem.image}
                        alt="Preview"
                      />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => {
                          if (newItem.imagePreview) {
                            URL.revokeObjectURL(newItem.imagePreview);
                          }
                          setNewItem({
                            ...newItem,
                            imageFile: null,
                            imagePreview: null,
                            image: "",
                          });
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}

                  <div className="form-group" style={{ marginTop: 12 }}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newItem.bestseller}
                        onChange={(e) =>
                          setNewItem({ ...newItem, bestseller: e.target.checked })
                        }
                      />
                      Mark as Bestseller
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newItem.RestorantOption}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            RestorantOption: e.target.checked,
                          })
                        }
                      />
                      Mark as Option Daily
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowAddItemModal(false)}>
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={editingItem ? handleUpdateItem : handleAddItem}
              >
                <i className="fas fa-check"></i>
                {editingItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Add/Edit Category Modal ---------- */}
      {showAddCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowAddCategoryModal(false)}>
          <div className="add-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <button className="close-modal" onClick={() => setShowAddCategoryModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Category Name (English) *</label>
                  <input
                    type="text"
                    placeholder="e.g., Appetizers"
                    value={newCategory.label}
                    onChange={(e) => {
                      const label = e.target.value;
                      const value = label.toLowerCase().trim().replace(/\s+/g, "-");
                      setNewCategory({ ...newCategory, label, value });
                    }}
                  />
                  <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
                    URL value: {newCategory.value || "auto-generated"}
                  </small>
                </div>

                <div className="form-group">
                  <label>Category Name (Arabic) - اسم الفئة</label>
                  <input
                    type="text"
                    placeholder="مثال: المقبلات"
                    value={newCategory.label_ar}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, label_ar: e.target.value })
                    }
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Select Icon *</label>
                <div className="icon-selector">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${newCategory.icon === icon ? "selected" : ""}`}
                      onClick={() => setNewCategory({ ...newCategory, icon })}
                    >
                      <i className={`fas ${icon}`}></i>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Preview</label>
                <div className="category-preview">
                  <i className={`fas ${newCategory.icon}`}></i>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span>{newCategory.label || "Category Name"}</span>
                    {newCategory.label_ar && (
                      <span dir="rtl" style={{ fontSize: "0.9em", color: "#666" }}>
                        {newCategory.label_ar}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowAddCategoryModal(false)}>
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
              >
                <i className="fas fa-check"></i>
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
