import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { StoreProvider } from '../context/StoreContext';
import { CartProvider } from '../context/CartContext';

import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import StoreOwnerDashboard from '../pages/store-owner-dashboard';
import CustomerDashboard from '../pages/customer-dashboard';
import AdminDashboard from '../pages/admin-dashboard';
import AdminLayout from '../layouts/AdminLayout';
import StoresPage from '../pages/Stores';
import CategoriesPage from '../pages/Categories';
import ProductsPage from '../pages/Products';
import ProductDetailPage from '../pages/ProductDetail';
import InventoryPage from '../pages/Inventory';
import CustomersPage from '../pages/Customers';
import CartPage from '../pages/Cart';
import OrdersPage from '../pages/Orders';
import SettingsPage from '../pages/Settings';

import StorefrontApp from '../pages/Storefront/StorefrontApp';

const getSubdomain = () => {
  const host = window.location.hostname;
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
  if (isIp || host === 'localhost') return null;
  const parts = host.split('.');
  if (parts.length >= 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    return parts[0];
  }
  return null;
};

function AppRoutes() {
  const subdomain = getSubdomain();

  // Clean up massive base64 images to prevent QuotaExceededError
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('aureum_owner_products');
      if (saved) {
        let products = JSON.parse(saved);
        let changed = false;
        products = products.map(p => {
          if (p.image && typeof p.image === 'string' && p.image.startsWith('data:image/') && p.image.length > 50000) {
            changed = true;
            return { ...p, image: '' };
          }
          return p;
        });
        if (changed) {
          localStorage.setItem('aureum_owner_products', JSON.stringify(products));
          console.log('Cleaned up massive base64 images from local storage to free quota.');
        }
      }
    } catch (e) {
      console.error('Failed to clean up localStorage', e);
    }
  }, []);

  if (subdomain) {
    return (
      <BrowserRouter>
        <AuthProvider>
          <StorefrontApp subdomain={subdomain} />
        </AuthProvider>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <AuthProvider>
            <Routes>
              {/* Home Page (BoConcept Storefront as Main Root "/") */}
              <Route path="/" element={<Home />} />
              <Route path="/storefront" element={<Home />} />
              <Route path="/store/:slug" element={<Home />} />

              {/* Portal Landing Page */}
              <Route path="/portal" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Standalone Dashboard Routes */}
              <Route path="/dashboard" element={<StoreOwnerDashboard />} />
              <Route path="/owner" element={<Navigate to="/owner/dashboard" replace />} />
              <Route path="/owner/dashboard" element={<StoreOwnerDashboard />} />
              <Route path="/owner/dashboard/*" element={<StoreOwnerDashboard />} />
              <Route path="/store-owner" element={<StoreOwnerDashboard />} />
              <Route path="/store-owner-dashboard" element={<StoreOwnerDashboard />} />
              <Route path="/merchant/dashboard" element={<StoreOwnerDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />

              {/* Merchant Admin Sub-pages */}
              <Route element={<AdminLayout />}>
                <Route path="/stores" element={<StoresPage />} />
                <Route path="/owner/stores" element={<StoresPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;