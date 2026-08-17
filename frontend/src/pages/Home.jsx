import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, ArrowRight, ShieldCheck, Zap, Store, Package, ShoppingCart, DollarSign, 
  CheckCircle, Star, Rocket, Crown, Mail, Check
} from "lucide-react";

const goslotStyles = `
  .goslot-theme {
    --primary: #2E7D32;
    --primary-dark: #1B5E20;
    --secondary: #43A047;
    --accent: #FFB300;
    --bg: #F8FAF7;
    --dark: #1F2937;
    --white: #FFFFFF;
    --ink: #16241A;
    --muted: #5B6B60;
    --line: rgba(31, 41, 55, 0.08);
    background: var(--bg);
    color: var(--ink);
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .goslot-theme h1, .goslot-theme h2, .goslot-theme h3, .goslot-theme h4 {
    color: var(--dark) !important;
    font-weight: 700 !important;
    letter-spacing: -0.02em !important;
  }
  .goslot-theme p, .goslot-theme span, .goslot-theme div, .goslot-theme li, .goslot-theme a {
    color: var(--ink) !important;
  }
  .goslot-theme p {
    color: var(--muted) !important;
    line-height: 1.7 !important;
  }
  .goslot-theme .text-dark, .goslot-theme .text-muted, .goslot-theme .fs-8.text-muted, .goslot-theme .fs-7.text-muted, .goslot-theme .fs-9.text-muted {
    color: var(--dark) !important;
  }
  .goslot-theme .text-success {
    color: var(--primary) !important;
  }
  .goslot-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    font-weight: 600;
    border-radius: 999px;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }
  .goslot-btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    box-shadow: 0 8px 24px rgba(46, 125, 50, 0.28);
  }
  .goslot-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(46, 125, 50, 0.36);
    color: white;
  }
  .goslot-btn-outline {
    background: white;
    border: 1px solid rgba(31, 41, 55, 0.16);
    color: var(--dark);
  }
  .goslot-btn-outline:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-2px);
  }
  .goslot-eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary);
    background: rgba(46, 125, 50, 0.08);
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 16px;
  }
  .goslot-hero {
    padding-top: 140px;
    padding-bottom: 100px;
    position: relative;
    overflow: hidden;
  }
  .hero-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.35;
    z-index: 0;
    animation: blobFloat 14s ease-in-out infinite;
  }
  .blob-1 {
    width: 420px; height: 420px;
    background: var(--secondary);
    top: -120px; right: -80px;
  }
  .blob-2 {
    width: 320px; height: 320px;
    background: var(--accent);
    bottom: -100px; left: -60px;
    animation-delay: -6s;
  }
  @keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.08); }
  }
  .goslot-card {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(31, 41, 55, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .goslot-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(31, 41, 55, 0.1);
  }
  .goslot-header {
    background: rgba(248, 250, 247, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--line);
  }
  .goslot-nav-link {
    color: var(--dark);
    font-weight: 600;
    text-decoration: none;
    position: relative;
    padding: 4px 0;
    transition: color 0.2s ease;
  }
  .goslot-nav-link:hover {
    color: var(--primary);
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleAddToCart = (e, prod) => {
    e.stopPropagation();
    setCartCount((prev) => prev + 1);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div className="goslot-theme">
      <style dangerouslySetInnerHTML={{ __html: goslotStyles }} />

      {/* HEADER */}
      <header className="fixed-top goslot-header py-3" style={{ zIndex: 1040 }}>
        <div className="container-xl d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ background: "#2E7D32", width: 36, height: 36 }}>
              <span className="text-white fw-bold fs-5">A</span>
            </div>
            <span className="fs-4 fw-bolder text-dark" style={{ letterSpacing: "-1px" }}>AUREUM</span>
          </div>

          <nav className="d-none d-lg-flex align-items-center gap-4">
            <a href="#hero" className="goslot-nav-link">Home</a>
            <a href="#features" className="goslot-nav-link">Features</a>
            <a href="#stores" className="goslot-nav-link">Stores</a>
            <a href="#products" className="goslot-nav-link">Catalog</a>
            <a href="#pricing" className="goslot-nav-link">Pricing</a>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate("/login")} className="goslot-btn goslot-btn-outline py-1.5 px-3 fs-8">
              Login
            </button>
            <button onClick={() => navigate("/login")} className="goslot-btn goslot-btn-primary py-1.5 px-3 fs-8">
              <Rocket size={14} /> Start Selling
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="goslot-hero">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        
        <div className="container-xl position-relative z-10 text-center max-w-4xl mx-auto">
          <div className="goslot-eyebrow">The Multi-Vendor SaaS Platform</div>
          <h1 className="display-4 fw-bolder mb-4">
            Build, Manage, and Scale Your <br />
            <span style={{ color: "var(--primary)" }}>Multi-Merchant Marketplace</span>
          </h1>
          <p className="fs-5 mx-auto mb-5" style={{ maxWidth: 680 }}>
            Aureum is the all-in-one platform for vendors to launch their stores and buyers to shop seamlessly. Manage orders, payouts, and catalogs from a central dashboard.
          </p>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
            <button onClick={() => navigate("/login")} className="goslot-btn goslot-btn-primary fs-6 px-5 py-3">
              Explore Marketplace <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate("/login")} className="goslot-btn goslot-btn-outline fs-6 px-5 py-3">
              Become a Merchant
            </button>
          </div>
          
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 gap-md-5 fs-8 text-muted fw-semibold">
            <div className="d-flex align-items-center gap-2"><ShieldCheck size={18} style={{ color: "var(--primary)" }} /> 100% Verified Vendors</div>
            <div className="d-flex align-items-center gap-2"><Zap size={18} style={{ color: "var(--primary)" }} /> Instant Payouts</div>
            <div className="d-flex align-items-center gap-2"><Store size={18} style={{ color: "var(--primary)" }} /> Custom Subdomains</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-5">
        <div className="container-xl">
          <div className="text-center mb-5">
            <div className="goslot-eyebrow">Core Features</div>
            <h2 className="fs-2 mb-3">Everything you need to run a platform</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: Store, title: "Storefronts", desc: "Merchants get custom subdomains, catalogs, and branding out of the box." },
              { icon: DollarSign, title: "Automated Payouts", desc: "Split payments seamlessly with Stripe Connect. Instant merchant commissions." },
              { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade 256-bit SSL encryption and full transaction audit logs." },
              { icon: ShoppingCart, title: "Unified Cart", desc: "Shoppers can buy from multiple stores in a single, seamless checkout flow." }
            ].map((f, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="goslot-card h-100 d-flex flex-column">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: 48, height: 48, background: "rgba(46,125,50,0.1)", color: "var(--primary)" }}>
                    <f.icon size={24} />
                  </div>
                  <h3 className="fs-5 mb-2">{f.title}</h3>
                  <p className="fs-7 mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORES */}
      <section id="stores" className="py-5" style={{ background: "rgba(46,125,50,0.02)" }}>
        <div className="container-xl">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
            <div>
              <div className="goslot-eyebrow">Featured Sellers</div>
              <h2 className="fs-3 mb-0">Discover Top Merchant Stores</h2>
            </div>
            <button onClick={() => navigate("/login")} className="goslot-btn goslot-btn-outline py-2 px-4 fs-8">View All Stores →</button>
          </div>
          <div className="row g-4">
            {[
              { name: "Coastal Threads Store", owner: "Sarah Jenkins", category: "Fashion & Apparel", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300" },
              { name: "Aureum Boutique", owner: "Elena Rostova", category: "Watches & Jewelry", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300" },
              { name: "Margas Store", owner: "Marcus Vance", category: "Bespoke Outerwear", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300" },
              { name: "Sheikh Home Decor", owner: "Fatima Sheikh", category: "Luxury Furniture", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300" }
            ].map((store, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="goslot-card h-100 p-3">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img src={store.img} alt={store.name} className="rounded-circle object-cover shadow-sm border" style={{ width: 56, height: 56 }} />
                    <div>
                      <div className="fw-bolder text-dark fs-7 lh-sm">{store.name}</div>
                      <div className="fs-8 text-muted">{store.category}</div>
                    </div>
                  </div>
                  <div className="fs-8 text-muted mb-3 d-flex align-items-center gap-1">
                    <CheckCircle size={14} className="text-success" /> Verified Owner: {store.owner}
                  </div>
                  <button onClick={() => navigate("/login")} className="btn btn-sm btn-light w-100 fs-8 fw-semibold border">Visit Store</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-5">
        <div className="container-xl">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
            <div>
              <div className="goslot-eyebrow">Catalog</div>
              <h2 className="fs-3 mb-0">Trending Products</h2>
            </div>
          </div>
          
          {(() => {
            const saved = localStorage.getItem("aureum_owner_products");
            let ownerProducts = [];
            if (saved) {
              try { ownerProducts = JSON.parse(saved); } catch (e) {}
            }
            if (!Array.isArray(ownerProducts)) ownerProducts = [];

            if (ownerProducts.length === 0) {
              return (
                <div className="goslot-card text-center py-5 my-3">
                  <Package size={40} className="text-muted mb-3 mx-auto" />
                  <h3 className="fs-4 mb-2">No Products Listed Yet</h3>
                  <p className="fs-7 text-muted max-w-md mx-auto mb-4">Start your merchant journey by creating a store and listing your first product.</p>
                  <button onClick={() => navigate("/login")} className="goslot-btn goslot-btn-primary">
                    Start Selling Today
                  </button>
                </div>
              );
            }

            return (
              <div className="row g-4">
                {ownerProducts.map((prod) => (
                  <div key={prod.id} className="col-12 col-sm-6 col-lg-3">
                    <div className="goslot-card p-3 h-100 cursor-pointer d-flex flex-column" onClick={() => setQuickViewProduct(prod)}>
                      <img src={prod.image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"} alt={prod.name} className="w-100 rounded-3 mb-3 object-cover" style={{ height: 180 }} />
                      <div className="fw-bolder fs-7 text-dark mb-1">{prod.name}</div>
                      <div className="fs-8 text-muted mb-2">{prod.category || "General"}</div>
                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="fw-bolder fs-5 text-dark">{prod.price}</span>
                        <button onClick={(e) => handleAddToCart(e, prod)} className="btn btn-sm btn-success rounded-pill px-3 fw-bold fs-8">+ Add</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-5" style={{ background: "rgba(46,125,50,0.02)" }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <div className="goslot-eyebrow">Pricing Plans</div>
            <h2 className="fs-2 mb-2">Simple, transparent pricing</h2>
            <p>Start for free, upgrade when you need more power.</p>
          </div>
          <div className="row g-4 justify-content-center max-w-5xl mx-auto">
            <div className="col-12 col-md-4">
              <div className="goslot-card h-100">
                <h3 className="fs-5 mb-1">Starter</h3>
                <p className="fs-8 text-muted mb-3">For new merchants</p>
                <div className="fs-2 fw-bolder mb-4">$29<span className="fs-7 text-muted fw-normal">/mo</span></div>
                <ul className="list-unstyled fs-7 text-muted space-y-3 mb-4">
                  <li><Check size={16} className="text-success me-2" /> 5 Storefronts</li>
                  <li><Check size={16} className="text-success me-2" /> 500 Products</li>
                  <li><Check size={16} className="text-success me-2" /> Standard Support</li>
                </ul>
                <button onClick={() => setShowRoleModal(true)} className="goslot-btn goslot-btn-outline w-100">Get Started</button>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="goslot-card h-100 border-success position-relative" style={{ borderWidth: 2, transform: "scale(1.02)" }}>
                <span className="position-absolute top-0 start-50 translate-middle badge bg-success rounded-pill px-3 py-1">POPULAR</span>
                <h3 className="fs-5 mb-1 text-success">Professional</h3>
                <p className="fs-8 text-muted mb-3">For growing networks</p>
                <div className="fs-2 fw-bolder mb-4">$79<span className="fs-7 text-muted fw-normal">/mo</span></div>
                <ul className="list-unstyled fs-7 text-muted space-y-3 mb-4">
                  <li><Check size={16} className="text-success me-2" /> 25 Storefronts</li>
                  <li><Check size={16} className="text-success me-2" /> Unlimited Products</li>
                  <li><Check size={16} className="text-success me-2" /> Automated Payouts</li>
                </ul>
                <button onClick={() => setShowRoleModal(true)} className="goslot-btn goslot-btn-primary w-100">Start Free Trial</button>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="goslot-card h-100">
                <h3 className="fs-5 mb-1">Enterprise</h3>
                <p className="fs-8 text-muted mb-3">For massive scale</p>
                <div className="fs-2 fw-bolder mb-4">$199<span className="fs-7 text-muted fw-normal">/mo</span></div>
                <ul className="list-unstyled fs-7 text-muted space-y-3 mb-4">
                  <li><Check size={16} className="text-success me-2" /> Unlimited Everything</li>
                  <li><Check size={16} className="text-success me-2" /> Custom Domains</li>
                  <li><Check size={16} className="text-success me-2" /> Dedicated Manager</li>
                </ul>
                <button onClick={() => setShowRoleModal(true)} className="goslot-btn goslot-btn-outline w-100">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-4 mt-5 bg-white border-top">
        <div className="container-xl d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 fs-8 text-muted">
          <div>
            <span className="fw-bolder text-dark me-2">AUREUM SaaS</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="d-flex gap-4">
            <a href="#privacy" className="text-muted text-decoration-none hover-text-dark">Privacy</a>
            <a href="#terms" className="text-muted text-decoration-none hover-text-dark">Terms</a>
          </div>
        </div>
      </footer>

      {/* ROLE SELECTOR MODAL */}
      {showRoleModal && (
        <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 1050, backdropFilter: "blur(4px)" }}>
          <div className="goslot-card w-100" style={{ maxWidth: 460 }}>
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
              <h3 className="fs-5 fw-bold mb-0">Select Workspace</h3>
              <button onClick={() => setShowRoleModal(false)} className="btn btn-sm btn-light rounded-circle">✕</button>
            </div>
            <div className="d-flex flex-column gap-3">
              <div onClick={() => { setShowRoleModal(false); navigate("/login"); }} className="p-3 rounded-3 border cursor-pointer d-flex align-items-center gap-3 hover-bg-light transition-all" style={{ background: "white" }}>
                <div className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center p-2">
                  <Store size={22} />
                </div>
                <div>
                  <div className="fw-bolder text-dark">Store Owner Dashboard</div>
                  <div className="fs-8 text-muted">Manage products & catalogs</div>
                </div>
              </div>
              <div onClick={() => { setShowRoleModal(false); navigate("/login"); }} className="p-3 rounded-3 border cursor-pointer d-flex align-items-center gap-3 hover-bg-light transition-all" style={{ background: "white" }}>
                <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center p-2">
                  <Crown size={22} />
                </div>
                <div>
                  <div className="fw-bolder text-dark">Super Admin Control</div>
                  <div className="fs-8 text-muted">Platform revenue & operations</div>
                </div>
              </div>
              <div onClick={() => { setShowRoleModal(false); navigate("/login"); }} className="p-3 rounded-3 border cursor-pointer d-flex align-items-center gap-3 hover-bg-light transition-all" style={{ background: "white" }}>
                <div className="rounded-circle bg-warning bg-opacity-25 text-dark d-flex align-items-center justify-content-center p-2">
                  <ShoppingCart size={22} />
                </div>
                <div>
                  <div className="fw-bolder text-dark">Customer Shopping Portal</div>
                  <div className="fs-8 text-muted">Browse items & track orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 1050, backdropFilter: "blur(4px)" }}>
          <div className="goslot-card w-100" style={{ maxWidth: 500 }}>
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <h3 className="fs-6 font-bold text-dark mb-0">{quickViewProduct.name}</h3>
              <button onClick={() => setQuickViewProduct(null)} className="btn btn-sm btn-light rounded-circle">✕</button>
            </div>
            <div className="row g-3">
              <div className="col-5">
                <img src={quickViewProduct.img || quickViewProduct.image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"} alt={quickViewProduct.name} className="w-100 rounded-3 object-cover shadow-sm" style={{ height: 140 }} />
              </div>
              <div className="col-7 d-flex flex-column justify-between">
                <div>
                  <div className="fs-9 text-success fw-bolder mb-1">{quickViewProduct.store_name || "Aureum Merchant"}</div>
                  <div className="fs-5 fw-bolder text-dark mb-2">{quickViewProduct.price}</div>
                  <p className="fs-8 text-muted mb-0">High-quality product available directly from the store owner.</p>
                </div>
                <button onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }} className="goslot-btn goslot-btn-primary py-2 w-100 mt-2 fs-7">
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}