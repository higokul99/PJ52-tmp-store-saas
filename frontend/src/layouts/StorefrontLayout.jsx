import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, User, LogOut } from 'lucide-react';
import { useStorefrontCart } from '../context/StorefrontCartContext';
import { useStorefrontAuth } from '../context/StorefrontAuthContext';
import { useAuth } from '../context/AuthContext';
import StorefrontLoginModal from '../components/StorefrontLoginModal';

export default function StorefrontLayout({ storeData, categories = [], products = [] }) {
  const { cartCount } = useStorefrontCart();
  const { user, logout } = useAuth();
  const { openLoginModal } = useStorefrontAuth();
  
  const isApparelFocused = storeData?.name?.toLowerCase().includes('ajil') || storeData?.name?.toLowerCase().includes('apparel');

  // Compute the combined list of categories (same logic as StorefrontHome)
  const productCategories = [];
  products.forEach(p => {
    const pCat = p.category && typeof p.category === 'object' ? (p.category.name || 'Uncategorized') : (p.category || 'Uncategorized');
    if (!productCategories.some(existing => String(existing).toLowerCase() === String(pCat).toLowerCase())) {
      productCategories.push(pCat);
    }
  });
  
  const categoriesToRender = [];
  if (categories && categories.length > 0) {
    categories.forEach(cat => {
      categoriesToRender.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug || String(cat.name || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
        isCustom: true
      });
    });
  }
  
  productCategories.forEach(catName => {
    if (!categoriesToRender.some(c => String(c.name || '').toLowerCase() === String(catName).toLowerCase() || String(c.id) === String(catName))) {
      categoriesToRender.push({
        id: catName,
        name: catName,
        slug: String(catName).toLowerCase().replace(/[^a-z0-9]/g, ''),
        isCustom: false
      });
    }
  });

  // Filter out empty categories
  const activeCategories = categoriesToRender.filter(cat => {
    const catProducts = products.filter(p => {
      const pCat = String((p.category && typeof p.category === 'object' ? p.category.name : p.category) || 'Uncategorized').toLowerCase();
      return pCat === String(cat.id).toLowerCase() || pCat === String(cat.name || '').toLowerCase() || pCat === String(cat.slug || '').toLowerCase();
    });
    return catProducts.length > 0;
  });

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="storefront-body">
      {/* Flipkart-Style Header */}
      <header className="storefront-header">
        <div className="storefront-header-content">
          <div className="storefront-logo">
            <span className="storefront-logo-text">{storeData.name}</span>
            <div className="storefront-logo-sub">Explore <span className="plus-icon">Plus</span></div>
          </div>

          <div className="storefront-search-bar">
            <input
              type="text"
              placeholder={`Search for products, brands and more in ${storeData.name}`}
              className="storefront-search-input"
            />
            <button className="storefront-search-btn">
              <Search size={18} style={{ color: '#2874f0' }} />
            </button>
          </div>

          <div className="storefront-nav-actions">
            {user && user.id ? (
              <div className="d-flex align-items-center gap-3">
                {/* User greeting and logout removed as requested */}
              </div>
            ) : (
              <button 
                className="btn bg-white fw-bold px-4 rounded-1 shadow-sm d-flex align-items-center justify-content-center" 
                style={{ color: '#2874f0', height: '36px', border: 'none' }}
                onClick={openLoginModal}
              >
                Create account
              </button>
            )}

            <Link to="/wishlist" className="storefront-nav-item text-decoration-none">
              Wishlist
            </Link>

            <Link to="/orders" className="storefront-nav-item text-decoration-none">
              My Orders
            </Link>

            <Link to="/cart" className="storefront-nav-item cart-item text-decoration-none">
              <div className="position-relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem', transform: 'translate(-30%, -30%)!important' }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </header>

      <StorefrontLoginModal />

      {/* Categories Sub-header */}
      <div className="storefront-categories-nav">
        <div className="storefront-categories-content">
          {activeCategories && activeCategories.length > 0 ? (
            activeCategories.map(cat => {
              const sectionId = cat.slug;
              return (
                <a
                  key={cat.id || cat.name}
                  href={`#${sectionId}`}
                  onClick={(e) => scrollToSection(e, sectionId)}
                  className="category-item text-decoration-none"
                >
                  {cat.name} <ChevronDown size={12} />
                </a>
              );
            })
          ) : (
            <div className="category-placeholder">No categories defined</div>
          )}
        </div>
      </div>

      <main className="storefront-main-content">
        <Outlet />
      </main>

      <footer className="storefront-footer">
        <div className="storefront-footer-content">
          <div className="footer-col">
            <h4>ABOUT</h4>
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
          </div>
          <div className="footer-col">
            <h4>HELP</h4>
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
          </div>
          <div className="footer-col">
            <h4>POLICY</h4>
            <p>Return Policy</p>
            <p>Terms Of Use</p>
            <p>Security</p>
          </div>
          <div className="footer-col border-left">
            <h4>Mail Us:</h4>
            <p>{storeData.name} Internet Private Limited,</p>
            <p>Buildings Alyssa, Begonia &</p>
            <p>Clove Embassy Tech Village,</p>
            <p>Bengaluru, 560103,</p>
            <p>Karnataka, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
