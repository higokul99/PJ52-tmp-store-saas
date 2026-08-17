import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useStorefrontCart } from '../../context/StorefrontCartContext';
import { useStorefrontAuth } from '../../context/StorefrontAuthContext';
import { normalizeProductImage } from '../../utils/imageUtils';

export default function StorefrontHome({ storeData, products, categories = [] }) {
  const { requireAuth } = useStorefrontAuth();
  // Determine if this is the apparel-focused store (Ajil Store)
  const isApparelFocused = storeData?.name?.toLowerCase().includes('ajil') || storeData?.name?.toLowerCase().includes('apparel');

  // Get unique category names from products (default to 'Uncategorized' if missing)
  const productCategories = [];
  products.forEach(p => {
    const pCat = p.category && typeof p.category === 'object' ? (p.category.name || 'Uncategorized') : (p.category || 'Uncategorized');
    if (!productCategories.some(existing => String(existing).toLowerCase() === String(pCat).toLowerCase())) {
      productCategories.push(pCat);
    }
  });
  
  // Create a combined list of categories to render
  const categoriesToRender = [];
  
  // First, add all explicit custom categories
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
  
  // Then, add any categories from products that aren't already in the list
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

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  const { addToCart, toggleWishlist, isInWishlist } = useStorefrontCart();

  const getFirstAvailableSize = (product) => {
    if (!product.size) return null;
    const sizes = String(product.size).toUpperCase().split(',').map(s => s.trim()).filter(Boolean);
    return sizes.length > 0 ? sizes[0] : null;
  };

  const getFirstAvailableColor = (product) => {
    if (!product.color) return null;
    const colors = String(product.color).split(',').map(c => c.trim()).filter(Boolean);
    return colors.length > 0 ? colors[0] : null;
  };

  const renderProductGrid = (items) => (
    items && items.length > 0 ? (
      <div className="storefront-product-grid">
        {items.map(product => (
          <div key={product.id} className="storefront-product-card position-relative">
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark d-block">
              <div className="storefront-product-image-container">
                <img 
                  src={normalizeProductImage(product.image || product.image_url, product.name)} 
                  alt={product.name} 
                  className="storefront-product-image"
                />
              </div>
              <div className="storefront-product-details pb-5">
                <div className="storefront-product-title">{product.name}</div>
                <div className="storefront-product-rating">
                  <span className="rating-badge">
                    {product.rating || "4.5"} ★
                  </span>
                </div>
                <div className="storefront-product-price-row" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  {product.compare_price && Number(product.compare_price) > Number(product.price) ? (
                    <>
                      <span className="storefront-product-original-price" style={{ textDecoration: 'line-through', color: '#878787', fontSize: '14px' }}>
                        ₹{Number(product.compare_price).toLocaleString('en-IN')}
                      </span>
                      <span className="storefront-product-price" style={{ color: '#212121', fontSize: '16px', fontWeight: '500' }}>
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </span>
                      <span className="storefront-product-discount" style={{ color: '#388e3c', fontSize: '13px', fontWeight: '500' }}>
                        — {Math.round(((Number(product.compare_price) - Number(product.price)) / Number(product.compare_price)) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="storefront-product-price" style={{ color: '#212121', fontSize: '16px', fontWeight: '500' }}>
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <div className="storefront-product-delivery">Free delivery</div>
              </div>
            </Link>
            
            {/* Wishlist Button (absolute top right) */}
            <button 
              className="btn position-absolute top-0 end-0 m-2 rounded-circle shadow-sm bg-white"
              style={{ width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                requireAuth(() => toggleWishlist(product));
              }}
            >
              <Heart size={16} fill={isInWishlist(product.id) ? '#ff4757' : 'none'} color={isInWishlist(product.id) ? '#ff4757' : '#ced4da'} />
            </button>

            {/* Add to Cart Button (absolute bottom) */}
            <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ zIndex: 2 }}>
              <button 
                className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#ff9f00', color: '#fff', border: 'none', fontSize: '0.85rem', padding: '8px' }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  requireAuth(() => addToCart({ ...product, selectedSize: getFirstAvailableSize(product), selectedColor: getFirstAvailableColor(product) }, 1));
                }}
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    ) : (
      <div className="storefront-empty-state">
        <p>No products found in this category.</p>
      </div>
    )
  );

  return (
    <div className="storefront-home">
      {/* Banner Carousel Placeholder */}
      <div className="storefront-banner-slider">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=300&fit=crop" 
          alt="Sale Banner" 
          className="storefront-banner-img"
        />
      </div>

      {categoriesToRender.length > 0 ? (
        categoriesToRender.map(cat => {
          const catProducts = products.filter(p => {
            const pCat = String((p.category && typeof p.category === 'object' ? p.category.name : p.category) || 'Uncategorized').toLowerCase();
            return pCat === String(cat.id).toLowerCase() || pCat === String(cat.name || '').toLowerCase() || pCat === String(cat.slug || '').toLowerCase();
          });
          
          if (catProducts.length === 0) return null;

          const sectionId = cat.slug;
          return (
            <div id={sectionId} key={cat.id || cat.name} className="storefront-section scroll-mt">
              <div className="storefront-section-header">
                <h3>{cat.isCustom ? `Best of ${cat.name}` : `Trending in ${cat.name}`}</h3>
                <button className="storefront-view-all-btn">VIEW ALL</button>
              </div>
              {renderProductGrid(catProducts)}
            </div>
          );
        })
      ) : (
        <div className="storefront-empty-state" style={{ padding: "60px 20px", textAlign: "center" }}>
          <h2>Welcome to {storeData.name}</h2>
          <p>This store doesn't have any collections or products yet.</p>
        </div>
      )}
    </div>
  );
}
