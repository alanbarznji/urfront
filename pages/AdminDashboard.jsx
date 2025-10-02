import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([
    { value: 'burgers', label: 'Burgers', icon: 'fa-hamburger' },
    { value: 'pizzas', label: 'Pizzas', icon: 'fa-pizza-slice' },
    { value: 'sandwiches', label: 'Sandwiches', icon: 'fa-bread-slice' },
    { value: 'salads', label: 'Salads', icon: 'fa-leaf' },
    { value: 'desserts', label: 'Desserts', icon: 'fa-ice-cream' },
    { value: 'drinks', label: 'Drinks', icon: 'fa-glass-martini' },
    { value: 'sides', label: 'Sides', icon: 'fa-french-fries' },
    { value: 'mains', label: 'Mains', icon: 'fa-utensils' }
  ]);
  const [activeTab, setActiveTab] = useState('pending');
  const [activeSection, setActiveSection] = useState('orders');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'burgers',
    image: '',
    bestseller: false,
    new: false
  });
  const [newCategory, setNewCategory] = useState({
    value: '',
    label: '',
    icon: 'fa-utensils'
  });

  const iconOptions = [
    'fa-utensils', 'fa-hamburger', 'fa-pizza-slice', 'fa-bread-slice',
    'fa-leaf', 'fa-ice-cream', 'fa-glass-martini', 'fa-french-fries',
    'fa-coffee', 'fa-drumstick-bite', 'fa-fish', 'fa-cheese',
    'fa-hotdog', 'fa-stroopwafel', 'fa-cookie', 'fa-apple-alt',
    'fa-carrot', 'fa-pepper-hot', 'fa-bacon', 'fa-egg'
  ];

  useEffect(() => {
    loadOrders();
    loadMenuItems();
    loadCategories();
    const interval = setInterval(() => {
      loadOrders();
      loadMenuItems();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    if (typeof window !== 'undefined') {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    }
  };

  const loadMenuItems = () => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('customMenuItems');
      if (storedItems) {
        setMenuItems(JSON.parse(storedItems));
      }
    }
  };

  const loadCategories = () => {
    if (typeof window !== 'undefined') {
      const storedCategories = localStorage.getItem('customCategories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.description) {
      alert('Please fill in all required fields');
      return;
    }

    const item = {
      id: Date.now(),
      ...newItem,
      price: parseFloat(newItem.price)
    };

    const updatedItems = [...menuItems, item];
    setMenuItems(updatedItems);
    localStorage.setItem('customMenuItems', JSON.stringify(updatedItems));
    
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: categories[0]?.value || 'burgers',
      image: '',
      bestseller: false,
      new: false
    });
    setShowAddItemModal(false);
    alert('Item added successfully!');
  };

  const handleUpdateItem = () => {
    if (!newItem.name || !newItem.price || !newItem.description) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedItems = menuItems.map(item => 
      item.id === editingItem.id ? { ...newItem, price: parseFloat(newItem.price) } : item
    );
    setMenuItems(updatedItems);
    localStorage.setItem('customMenuItems', JSON.stringify(updatedItems));
    
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: categories[0]?.value || 'burgers',
      image: '',
      bestseller: false,
      new: false
    });
    setEditingItem(null);
    setShowAddItemModal(false);
    alert('Item updated successfully!');
  };

  const handleDeleteItem = (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = menuItems.filter(item => item.id !== itemId);
      setMenuItems(updatedItems);
      localStorage.setItem('customMenuItems', JSON.stringify(updatedItems));
      alert('Item deleted successfully!');
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.value || !newCategory.label) {
      alert('Please fill in category name');
      return;
    }

    // Check if category value already exists
    if (categories.some(cat => cat.value === newCategory.value.toLowerCase())) {
      alert('Category already exists!');
      return;
    }

    const category = {
      value: newCategory.value.toLowerCase().replace(/\s+/g, '-'),
      label: newCategory.label,
      icon: newCategory.icon
    };

    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
    
    setNewCategory({ value: '', label: '', icon: 'fa-utensils' });
    setShowAddCategoryModal(false);
    alert('Category added successfully!');
  };

  const handleUpdateCategory = () => {
    if (!newCategory.value || !newCategory.label) {
      alert('Please fill in category name');
      return;
    }

    const updatedCategories = categories.map(cat => 
      cat.value === editingCategory.value ? newCategory : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
    
    setNewCategory({ value: '', label: '', icon: 'fa-utensils' });
    setEditingCategory(null);
    setShowAddCategoryModal(false);
    alert('Category updated successfully!');
  };

  const handleDeleteCategory = (categoryValue) => {
    // Check if any items use this category
    const itemsInCategory = menuItems.filter(item => item.category === categoryValue);
    if (itemsInCategory.length > 0) {
      alert(`Cannot delete category. ${itemsInCategory.length} items are using this category. Please reassign or delete those items first.`);
      return;
    }

    if (confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter(cat => cat.value !== categoryValue);
      setCategories(updatedCategories);
      localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
      alert('Category deleted successfully!');
    }
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <div className="admin-dashboard">
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
              <i className="fas fa-clock"></i>
              <div>
                <h3>{orders.filter(o => o.status === 'pending').length}</h3>
                <p>Pending Orders</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-utensils"></i>
              <div>
                <h3>{menuItems.length}</h3>
                <p>Menu Items</p>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-th-large"></i>
              <div>
                <h3>{categories.length}</h3>
                <p>Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="section-tabs">
          <button
            className={`section-tab ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            <i className="fas fa-shopping-bag"></i>
            Orders
          </button>
          <button
            className={`section-tab ${activeSection === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveSection('menu')}
          >
            <i className="fas fa-utensils"></i>
            Menu Items
          </button>
          <button
            className={`section-tab ${activeSection === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveSection('categories')}
          >
            <i className="fas fa-th-large"></i>
            Categories
          </button>
        </div>

        {/* Orders Section */}
        {activeSection === 'orders' && (
          <>
            <div className="tabs">
              {['pending', 'preparing', 'ready', 'completed'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="badge">{orders.filter(o => o.status === tab).length}</span>
                </button>
              ))}
            </div>

            <div className="orders-grid">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>{order.orderNumber}</h3>
                        <span className={`order-type ${order.type}`}>
                          <i className={`fas ${order.type === 'delivery' ? 'fa-motorcycle' : 'fa-store'}`}></i>
                          {order.type === 'delivery' ? 'Delivery' : 'Dine In'}
                        </span>
                      </div>
                      <span className="order-time">{new Date(order.time).toLocaleTimeString()}</span>
                    </div>

                    <div className="customer-info">
                      <div className="info-row">
                        <i className="fas fa-user"></i>
                        <span>{order.customerName}</span>
                      </div>
                      {order.type === 'delivery' ? (
                        <>
                          <div className="info-row">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{order.address}</span>
                          </div>
                          <div className="info-row">
                            <i className="fas fa-phone"></i>
                            <span>{order.phone}</span>
                          </div>
                        </>
                      ) : (
                        <div className="info-row">
                          <i className="fas fa-chair"></i>
                          <span>{order.tableNumber || 'Not specified'}</span>
                        </div>
                      )}
                    </div>

                    <div className="order-items">
                      <h4>Items:</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="item-row">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="total">
                        <strong>Total:</strong>
                        <strong className="amount">${order.total.toFixed(2)}</strong>
                      </div>
                      <div className="actions">
                        {order.status === 'pending' && (
                          <>
                            <button className="btn-action accept" onClick={() => updateOrderStatus(order.id, 'preparing')}>
                              <i className="fas fa-check"></i> Accept
                            </button>
                            <button className="btn-action reject" onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                              <i className="fas fa-times"></i> Reject
                            </button>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <button className="btn-action ready" onClick={() => updateOrderStatus(order.id, 'ready')}>
                            <i className="fas fa-check-circle"></i> Mark Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button className="btn-action complete" onClick={() => updateOrderStatus(order.id, 'completed')}>
                            <i className="fas fa-flag-checkered"></i> Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <h3>No {activeTab} orders</h3>
                  <p>Orders will appear here when customers place them</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Menu Items Section */}
        {activeSection === 'menu' && (
          <div className="menu-management">
            <div className="menu-header">
              <h2>Menu Items ({menuItems.length})</h2>
              <button className="btn-add-item" onClick={() => {
                setEditingItem(null);
                setNewItem({
                  name: '',
                  description: '',
                  price: '',
                  category: categories[0]?.value || 'burgers',
                  image: '',
                  bestseller: false,
                  new: false
                });
                setShowAddItemModal(true);
              }}>
                <i className="fas fa-plus"></i>
                Add New Item
              </button>
            </div>

            <div className="menu-items-grid">
              {menuItems.map(item => (
                <div key={item.id} className="menu-item-card-admin">
                  <div className="menu-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="placeholder-image">
                        <i className={`fas ${categories.find(c => c.value === item.category)?.icon || 'fa-utensils'}`}></i>
                      </div>
                    )}
                    {item.bestseller && <span className="item-badge bestseller">Bestseller</span>}
                    {item.new && <span className="item-badge new-badge">New</span>}
                  </div>
                  <div className="menu-item-content">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-meta">
                      <span className="item-category">
                        <i className={`fas ${categories.find(c => c.value === item.category)?.icon}`}></i>
                        {categories.find(c => c.value === item.category)?.label}
                      </span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="menu-item-actions">
                    <button className="btn-edit" onClick={() => {
                      setEditingItem(item);
                      setNewItem(item);
                      setShowAddItemModal(true);
                    }}>
                      <i className="fas fa-edit"></i>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}>
                      <i className="fas fa-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              ))}

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

        {/* Categories Section */}
        {activeSection === 'categories' && (
          <div className="category-management">
            <div className="menu-header">
              <h2>Categories ({categories.length})</h2>
              <button className="btn-add-item" onClick={() => {
                setEditingCategory(null);
                setNewCategory({ value: '', label: '', icon: 'fa-utensils' });
                setShowAddCategoryModal(true);
              }}>
                <i className="fas fa-plus"></i>
                Add New Category
              </button>
            </div>

            <div className="categories-grid">
              {categories.map(category => {
                const itemCount = menuItems.filter(item => item.category === category.value).length;
                return (
                  <div key={category.value} className="category-card">
                    <div className="category-icon-large">
                      <i className={`fas ${category.icon}`}></i>
                    </div>
                    <div className="category-info">
                      <h3>{category.label}</h3>
                      <p className="category-value">{category.value}</p>
                      <p className="category-count">{itemCount} items</p>
                    </div>
                    <div className="category-actions">
                      <button className="btn-edit-small" onClick={() => {
                        setEditingCategory(category);
                        setNewCategory(category);
                        setShowAddCategoryModal(true);
                      }}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-delete-small" onClick={() => handleDeleteCategory(category.value)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      {showAddItemModal && (
        <div className="modal-overlay" onClick={() => setShowAddItemModal(false)}>
          <div className="add-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <button className="close-modal" onClick={() => setShowAddItemModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Item Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Classic Burger"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  placeholder="Describe your item..."
                  rows="3"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
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
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newItem.bestseller}
                    onChange={(e) => setNewItem({...newItem, bestseller: e.target.checked})}
                  />
                  Mark as Bestseller
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newItem.new}
                    onChange={(e) => setNewItem({...newItem, new: e.target.checked})}
                  />
                  Mark as New Item
                </label>
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
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowAddCategoryModal(false)}>
          <div className="add-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="close-modal" onClick={() => setShowAddCategoryModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Appetizers"
                  value={newCategory.label}
                  onChange={(e) => {
                    const label = e.target.value;
                    const value = label.toLowerCase().replace(/\s+/g, '-');
                    setNewCategory({...newCategory, label, value});
                  }}
                />
                <small style={{color: '#666', marginTop: '0.5rem', display: 'block'}}>
                  URL value: {newCategory.value || 'auto-generated'}
                </small>
              </div>

              <div className="form-group">
                <label>Select Icon *</label>
                <div className="icon-selector">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${newCategory.icon === icon ? 'selected' : ''}`}
                      onClick={() => setNewCategory({...newCategory, icon})}
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
                  <span>{newCategory.label || 'Category Name'}</span>
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
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}

 
        
     
    </div>
  );
}