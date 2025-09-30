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
              <h1>Zirak Dashboard</h1>
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

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: 'Poppins', sans-serif;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #2d2522, #3d3128);
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: white;
        }

        .brand-icon {
          font-size: 3rem;
          color: #d4a76a;
        }

        .brand-section h1 {
          font-size: 2rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(45deg, #d4a76a, #b87333);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-section p {
          margin: 0;
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .header-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .stat-card i {
          font-size: 2rem;
          color: #d4a76a;
        }

        .stat-card h3 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }

        .stat-card p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .dashboard-body {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .section-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .section-tab {
          padding: 1rem 2rem;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
        }

        .section-tab:hover {
          border-color: #b87333;
          transform: translateY(-2px);
        }

        .section-tab.active {
          background: linear-gradient(135deg, #b87333, #d4a76a);
          color: white;
          border-color: #b87333;
          box-shadow: 0 4px 15px rgba(184, 115, 51, 0.3);
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .tab-btn:hover {
          border-color: #b87333;
          transform: translateY(-2px);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #b87333, #d4a76a);
          color: white;
          border-color: #b87333;
          box-shadow: 0 4px 15px rgba(184, 115, 51, 0.3);
        }

        .tab-btn .badge {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 20px;
          font-size: 0.8rem;
          min-width: 24px;
          text-align: center;
        }

        .tab-btn.active .badge {
          background: rgba(255, 255, 255, 0.3);
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .order-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .order-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border-color: #b87333;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .order-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .order-type {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .order-type.delivery {
          background: linear-gradient(135deg, #4caf50, #81c784);
          color: white;
        }

        .order-type.dine-in {
          background: linear-gradient(135deg, #2196f3, #64b5f6);
          color: white;
        }

        .order-time {
          font-size: 0.85rem;
          color: #999;
        }

        .customer-info {
          margin-bottom: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
          color: #555;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-row i {
          color: #b87333;
          width: 20px;
        }

        .order-items {
          margin-bottom: 1rem;
        }

        .order-items h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .item-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 0.9rem;
        }

        .item-row:last-child {
          border-bottom: none;
        }

        .order-footer {
          padding-top: 1rem;
          border-top: 2px solid #f0f0f0;
        }

        .total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .amount {
          color: #b87333;
          font-size: 1.3rem;
        }

        .actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-action {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-action.accept {
          background: linear-gradient(135deg, #4caf50, #66bb6a);
          color: white;
        }

        .btn-action.reject {
          background: linear-gradient(135deg, #f44336, #e57373);
          color: white;
        }

        .btn-action.ready {
          background: linear-gradient(135deg, #2196f3, #64b5f6);
          color: white;
        }

        .btn-action.complete {
          background: linear-gradient(135deg, #9c27b0, #ba68c8);
          color: white;
        }

        .menu-management, .category-management {
          margin-top: 2rem;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .menu-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #333;
        }

        .btn-add-item {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          background: linear-gradient(135deg, #b87333, #d4a76a);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(184, 115, 51, 0.3);
        }

        .btn-add-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 115, 51, 0.4);
        }

        .menu-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .menu-item-card-admin {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .menu-item-card-admin:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border-color: #b87333;
        }

        .menu-item-image {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, #f9f6f3, #e8d5c0);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-image {
          font-size: 4rem;
          color: #b87333;
          opacity: 0.3;
        }

        .item-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .item-badge.bestseller {
          background: linear-gradient(135deg, #ff9800, #ffb74d);
          color: white;
        }

        .item-badge.new-badge {
          background: linear-gradient(135deg, #2196f3, #64b5f6);
          color: white;
        }

        .menu-item-content {
          padding: 1.5rem;
        }

        .menu-item-content h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .item-description {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }

        .item-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.85rem;
        }

        .item-category i {
          color: #b87333;
        }

        .item-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #b87333;
        }

        .menu-item-actions {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .btn-edit, .btn-delete {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-edit {
          background: linear-gradient(135deg, #2196f3, #64b5f6);
          color: white;
        }

        .btn-edit:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }

        .btn-delete {
          background: linear-gradient(135deg, #f44336, #e57373);
          color: white;
        }

        .btn-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        }

        /* Categories Section */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border-color: #b87333;
        }

        .category-icon-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b87333, #d4a76a);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 2.5rem;
          color: white;
        }

        .category-info h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .category-value {
          font-size: 0.85rem;
          color: #999;
          margin: 0 0 0.5rem 0;
          font-family: monospace;
        }

        .category-count {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }

        .category-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn-edit-small, .btn-delete-small {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-edit-small {
          background: linear-gradient(135deg, #2196f3, #64b5f6);
          color: white;
        }

        .btn-edit-small:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }

        .btn-delete-small {
          background: linear-gradient(135deg, #f44336, #e57373);
          color: white;
        }

        .btn-delete-small:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        }

        /* Icon Selector */
        .icon-selector {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
          gap: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
          padding: 0.5rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
        }

        .icon-option {
          width: 50px;
          height: 50px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #666;
        }

        .icon-option:hover {
          border-color: #b87333;
          background: #f9f6f3;
          transform: scale(1.05);
        }

        .icon-option.selected {
          border-color: #b87333;
          background: linear-gradient(135deg, #b87333, #d4a76a);
          color: white;
          box-shadow: 0 4px 12px rgba(184, 115, 51, 0.3);
        }

        .category-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f9f6f3, #e8d5c0);
          border-radius: 12px;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
        }

        .category-preview i {
          font-size: 2rem;
          color: #b87333;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(5px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .add-item-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(45deg, #b87333, #8c5425);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .close-modal {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .close-modal:hover {
          background: #f44336;
          color: white;
          border-color: #f44336;
        }

        .modal-body {
          padding: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #b87333;
          box-shadow: 0 0 0 4px rgba(184, 115, 51, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-weight: 500;
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-top: 2px solid #f0f0f0;
        }

        .btn-cancel, .btn-save {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-cancel {
          background: #f5f5f5;
          color: #666;
        }

        .btn-cancel:hover {
          background: #e0e0e0;
          transform: translateY(-2px);
        }

        .btn-save {
          background: linear-gradient(135deg, #b87333, #d4a76a);
          color: white;
          box-shadow: 0 4px 15px rgba(184, 115, 51, 0.3);
        }

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 115, 51, 0.4);
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .empty-state i {
          font-size: 4rem;
          color: #ddd;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #666;
        }

        .empty-state p {
          color: #999;
        }

        @media (max-width: 768px) {
          .orders-grid,
          .menu-items-grid,
          .categories-grid {
            grid-template-columns: 1fr;
          }

          .header-stats {
            grid-template-columns: 1fr;
          }

          .tabs,
          .section-tabs {
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
          }

          .tab-btn,
          .section-tab {
            white-space: nowrap;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .menu-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .btn-add-item {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}