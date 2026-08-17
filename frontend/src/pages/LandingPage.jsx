import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import useSEO from '../hooks/useSEO';

export default function LandingPage() {
  const { stores, activeStore, switchStore } = useStore();
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  useSEO({
    title: 'AUREUM - Next-Gen E-Commerce Platform',
    description: 'The complete multi-store platform to manage stores, inventory, orders, and customer checkouts.'
  });

  return (
    <div
      className="min-vh-100 d-flex flex-column text-white position-relative overflow-hidden"
      style={{
        backgroundColor: '#0b0f19',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Glow Orbs Background Effects */}
      <div
        className="position-absolute rounded-circle filter-blur"
        style={{
          top: '-150px',
          left: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 128, 96, 0.28) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      ></div>

      {/* Seamless Theme Matching Navbar */}
      <header
        className="sticky-top py-3 px-4 z-index-100"
        style={{
          background: 'rgba(11, 15, 25, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          {/* Brand Logo & Title */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-3 text-white fw-bold d-flex align-items-center justify-content-center shadow-lg"
              style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #008060 0%, #004d3a 100%)',
                boxShadow: '0 4px 14px rgba(0, 128, 96, 0.4)'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <div>
              <h5 className="fw-extrabold text-white m-0 tracking-tight" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>AUREUM</h5>
              <span className="fs-8 text-white-50 fw-semibold">E-Commerce Platform</span>
            </div>
          </div>

          {/* Get Started Free Button with Role Selector */}
          <div className="d-flex align-items-center gap-2.5">
            <button
              className="btn btn-shopify fw-bold px-4 py-2 rounded-pill shadow-sm fs-7"
              onClick={() => setShowRoleModal(true)}
            >
              🚀 Get Started Free
            </button>
            <NavLink
              to="/storefront"
              className="btn btn-outline-light fw-bold px-3.5 py-2 rounded-pill border-secondary fs-7"
            >
              🛍️ Shop as Customer
            </NavLink>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-5 px-3 text-center position-relative z-index-1">
        <div className="container py-4 max-w-4xl mx-auto">
          {/* Live Status Pill */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-4 border" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
            <span className="spinner-grow spinner-grow-sm text-success" style={{ width: '8px', height: '8px' }}></span>
            <span className="fs-7 fw-bold text-light text-uppercase tracking-wider">✨ Next-Gen Multi-Store E-Commerce Platform</span>
          </div>

          {/* Headline */}
          <h1
            className="display-2 fw-extrabold text-white mb-3 tracking-tight"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Build, Launch & Scale Your <br className="d-none d-md-block" />
            <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Online Stores
            </span>
          </h1>

          <p className="lead text-light opacity-80 mb-4 max-w-2xl mx-auto fs-5">
            Everything you need to manage products, maintain inventory stock, process orders, and accept customer checkouts seamlessly.
          </p>

          {/* Main Action CTAs */}
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
            <button
              className="btn btn-lg px-5 py-3 fw-bold fs-6 rounded-pill text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #008060 0%, #005a43 100%)', boxShadow: '0 8px 25px rgba(0, 128, 96, 0.4)' }}
              onClick={() => setShowRoleModal(true)}
            >
              🚀 Get Started Free ➔
            </button>
            <NavLink
              to="/storefront"
              className="btn btn-outline-light btn-lg px-5 py-3 fw-bold fs-6 rounded-pill"
            >
              🛍️ Shop as Customer
            </NavLink>
          </div>
        </div>
      </section>

      {/* 3 User Roles Portals Section */}
      <section className="py-5 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: '#090d16' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-success bg-opacity-25 text-success text-uppercase px-3 py-1.5 fs-8 fw-bold mb-2">Platform Ecosystem</span>
            <h2 className="fw-extrabold text-white mb-2">Three Dedicated Roles for Every User</h2>
            <p className="text-white-50 fs-6">Experience AUREUM as a Store Owner, Online Customer, or Admin</p>
          </div>

          <div className="row g-4">
            {/* 1. Store Owner Role Card */}
            <div className="col-12 col-md-4">
              <div className="p-4 rounded-4 h-100 border text-start d-flex flex-column" style={{ background: 'rgba(20, 28, 46, 0.7)', borderColor: 'rgba(0, 128, 96, 0.4)' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="display-6 text-success">🏬</div>
                  <span className="badge bg-success text-white fw-bold">Merchant Store Owner</span>
                </div>
                <h4 className="fw-bold text-white mb-2">Store Merchant</h4>
                <p className="text-white-50 fs-7 mb-4 flex-grow-1">
                  Create and customize store settings (logo, name, currency), add products, manage category catalog, and track customer orders.
                </p>
                <NavLink to="/register" className="btn btn-shopify w-100 fw-bold rounded-pill">
                  Become a Store Owner ➔
                </NavLink>
              </div>
            </div>

            {/* 2. Customer Role Card */}
            <div className="col-12 col-md-4">
              <div className="p-4 rounded-4 h-100 border text-start d-flex flex-column" style={{ background: 'rgba(20, 28, 46, 0.7)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="display-6 text-info">🛍️</div>
                  <span className="badge bg-info text-white fw-bold">Online Customer</span>
                </div>
                <h4 className="fw-bold text-white mb-2">Shopper & Buyer</h4>
                <p className="text-white-50 fs-7 mb-4 flex-grow-1">
                  Browse store catalogs, filter products by category, manage shopping cart items, and place instant online orders.
                </p>
                <NavLink to="/storefront" className="btn btn-outline-info text-info w-100 fw-bold rounded-pill">
                  Shop as Customer ➔
                </NavLink>
              </div>
            </div>

            {/* 3. Admin Role Card */}
            <div className="col-12 col-md-4">
              <div className="p-4 rounded-4 h-100 border text-start d-flex flex-column" style={{ background: 'rgba(20, 28, 46, 0.7)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="display-6 text-warning">👑</div>
                  <span className="badge bg-warning text-dark fw-bold">Platform Admin</span>
                </div>
                <h4 className="fw-bold text-white mb-2">System Administrator</h4>
                <p className="text-white-50 fs-7 mb-4 flex-grow-1">
                  Full multi-store network control, overall platform revenue metrics, global inventory oversight, and user role management.
                </p>
                <NavLink to="/login" className="btn btn-outline-warning w-100 fw-bold rounded-pill">
                  Admin Portal ➔
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1050 }}
          onClick={() => setShowRoleModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-lg text-dark rounded-4 p-2">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h4 className="fw-extrabold m-0 text-dark">Get Started with AUREUM</h4>
                  <p className="text-muted fs-7 m-0">Select your account role to continue</p>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowRoleModal(false)}></button>
              </div>

              <div className="modal-body py-4">
                <div className="d-flex flex-column gap-3">
                  {/* Option 1: Store Owner */}
                  <div
                    className="p-3 rounded-3 border shopify-card cursor-pointer d-flex align-items-center justify-content-between"
                    style={{ background: '#f8fafc' }}
                    onClick={() => { setShowRoleModal(false); navigate('/login'); }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-2">🏬</div>
                      <div>
                        <h6 className="fw-bold text-dark m-0">Become a Store Owner</h6>
                        <span className="fs-7 text-muted">Create store, list products & manage sales</span>
                      </div>
                    </div>
                    <span className="btn btn-sm btn-shopify fw-bold">Register ➔</span>
                  </div>

                  {/* Option 2: Customer */}
                  <div
                    className="p-3 rounded-3 border shopify-card cursor-pointer d-flex align-items-center justify-content-between"
                    style={{ background: '#f8fafc' }}
                    onClick={() => { setShowRoleModal(false); navigate('/login'); }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-2">🛍️</div>
                      <div>
                        <h6 className="fw-bold text-dark m-0">Shop as Customer</h6>
                        <span className="fs-7 text-muted">Explore storefront catalog & buy products</span>
                      </div>
                    </div>
                    <span className="btn btn-sm btn-outline-dark fw-bold">Shop Now ➔</span>
                  </div>

                  {/* Option 3: Admin */}
                  <div
                    className="p-3 rounded-3 border shopify-card cursor-pointer d-flex align-items-center justify-content-between"
                    style={{ background: '#f8fafc' }}
                    onClick={() => { setShowRoleModal(false); navigate('/login'); }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-2">👑</div>
                      <div>
                        <h6 className="fw-bold text-dark m-0">Platform Administrator</h6>
                        <span className="fs-7 text-muted">Manage network dashboard & stores</span>
                      </div>
                    </div>
                    <span className="btn btn-sm btn-outline-warning text-dark fw-bold">Admin ➔</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 border-top border-secondary text-center fs-7 text-white-50" style={{ background: '#060911' }}>
        <div className="container">
          <p className="m-0">© 2026 AUREUM E-Commerce OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
