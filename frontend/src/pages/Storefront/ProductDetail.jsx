import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { useStorefrontCart } from '../../context/StorefrontCartContext';
import { useStorefrontAuth } from '../../context/StorefrontAuthContext';
import { normalizeProductImage } from '../../utils/imageUtils';

export default function ProductDetail({ storeData, products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useStorefrontCart();
  const { requireAuth } = useStorefrontAuth();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = products.find(p => String(p.id) === String(id) || String(p.backend_id) === String(id) || String(p.slug) === String(id));

  if (!product) {
    return (
      <div className="storefront-container py-5 text-center">
        <h2>Product not found</h2>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
          Return to Store
        </button>
      </div>
    );
  }

  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const inWishlist = isInWishlist(product.id);

  // Size calculation
  const productSizes = product.size 
    ? String(product.size).toUpperCase().split(',').map(s => s.trim()).filter(Boolean) 
    : [];
  const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const displaySizes = [...standardSizes];
  
  productSizes.forEach(sz => {
    if (!displaySizes.includes(sz)) {
      displaySizes.push(sz);
    }
  });

  // Set default size
  React.useEffect(() => {
    if (productSizes.length > 0 && !selectedSize) {
      setSelectedSize(productSizes[0]);
    }
  }, [productSizes, selectedSize]);

  // Color calculation
  const productColors = product.color 
    ? String(product.color).split(',').map(c => c.trim()).filter(Boolean)
    : [];

  // Set default color
  React.useEffect(() => {
    if (productColors.length > 0 && !selectedColor) {
      setSelectedColor(productColors[0]);
    }
  }, [productColors, selectedColor]);

  const handleAddToCart = () => {
    requireAuth(() => addToCart({ ...product, selectedSize, selectedColor }, 1));
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      addToCart({ ...product, selectedSize, selectedColor }, 1);
      navigate('/checkout');
    });
  };

  return (
    <div className="storefront-container py-5">
      <button 
        className="btn btn-link text-decoration-none text-secondary mb-4 d-flex align-items-center gap-2 p-0"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} /> Back to Store
      </button>

      <div className="row g-5">
        <div className="col-md-6">
          <div className="product-image-container p-4 bg-white rounded-3 shadow-sm border border-light text-center h-100 d-flex align-items-center justify-content-center position-relative">
            <img 
              src={normalizeProductImage(product.image || product.image_url, product.name)} 
              alt={product.name} 
              className="img-fluid rounded" 
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
            <button 
              className="btn position-absolute top-0 end-0 m-3 rounded-circle shadow-sm bg-white"
              style={{ width: '40px', height: '40px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: inWishlist ? '#ff4757' : '#ced4da' }}
              onClick={() => requireAuth(() => toggleWishlist(product))}
            >
              <Heart size={20} fill={inWishlist ? '#ff4757' : 'none'} />
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-info-details">
            {categoryName && (
              <span className="text-uppercase text-muted fs-8 fw-bold mb-2 d-block tracking-wider">
                {categoryName}
              </span>
            )}
            <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
            
            <div className="d-flex align-items-baseline gap-2 mb-4">
              {product.compare_price && Number(product.compare_price) > Number(product.price) ? (
                <>
                  <span className="fs-4 text-muted text-decoration-line-through">
                    ₹{Number(product.compare_price).toLocaleString('en-IN')}
                  </span>
                  <span className="fs-2 fw-bold text-dark">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </span>
                  <span className="fs-5 fw-bold" style={{ color: '#388e3c' }}>
                    — {Math.round(((Number(product.compare_price) - Number(product.price)) / Number(product.compare_price)) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="fs-2 fw-bold text-dark">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-secondary fs-6 mb-4 lh-lg">
              {product.description || 'This premium product is part of our exclusive collection. Crafted with the finest materials and designed to exceed your expectations. Experience the perfect blend of style and functionality.'}
            </p>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold fs-6">Select Size</span>
                <span className="text-primary fs-8 cursor-pointer text-decoration-underline">Size Guide</span>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {displaySizes.map((sz, idx) => {
                  const isAvailable = productSizes.includes(sz);
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={idx}
                      className={`btn border fw-bold d-flex align-items-center justify-content-center ${isSelected ? 'border-dark bg-dark text-white' : 'bg-white text-dark'} ${!isAvailable ? 'opacity-50 text-decoration-line-through' : ''}`}
                      style={{ width: '48px', height: '48px', borderRadius: '8px' }}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(sz)}
                      title={!isAvailable ? 'Out of stock' : 'In stock'}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {productColors.length > 0 && (
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold fs-6">Select Color</span>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {productColors.map((color, idx) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={idx}
                        className={`btn border fw-semibold d-flex align-items-center justify-content-center px-4 py-1 text-capitalize ${isSelected ? 'border-dark bg-dark text-white' : 'bg-white text-dark'}`}
                        style={{ borderRadius: '8px' }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="d-flex flex-column gap-3 mb-5">
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                  style={{ backgroundColor: '#ff9f00', color: '#fff', border: 'none' }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button 
                  className="btn btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                  style={{ backgroundColor: '#fb641b', color: '#fff', border: 'none' }}
                  onClick={handleBuyNow}
                >
                  <Zap size={20} /> Buy Now
                </button>
              </div>
              <button 
                className="btn btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 w-100"
                style={{ backgroundColor: '#25D366', color: '#fff', border: 'none' }}
                onClick={() => {
                  const text = encodeURIComponent(`Hi, I would like to buy: ${product.name}\nPrice: $${product.price}`);
                  window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Buy via WhatsApp
              </button>
            </div>

            <div className="border-top pt-4">
              <div className="d-flex flex-column gap-2 text-muted fs-7">
                <div className="d-flex gap-2">
                  <strong>Availability:</strong> 
                  <span className={product.stock > 0 || product.stock_quantity > 0 ? 'text-success' : 'text-danger'}>
                    {product.stock > 0 || product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                {product.brand && (
                  <div className="d-flex gap-2">
                    <strong>Brand:</strong> {product.brand}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
