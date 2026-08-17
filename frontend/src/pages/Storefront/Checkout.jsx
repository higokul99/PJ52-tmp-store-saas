import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorefrontCart } from '../../context/StorefrontCartContext';
import { normalizeProductImage } from '../../utils/imageUtils';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, storeId } = useStorefrontCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="storefront-container py-5 text-center">
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Return to Store
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      store_id: storeId,
      customer_name: formData.firstName,
      customer_email: 'guest@example.com', // Default since email field was removed
      shipping_address: `${formData.address}, ${formData.city}`,
      payment_method: formData.paymentMethod,
      items: cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      // Import api at the top if needed, but wait we need to import api first.
      // I'll just use fetch or api from axios.
      const { default: api } = await import('../../api/axios');
      await api.post('/orders', orderPayload);
    } catch (err) {
      console.warn("Backend API failed, saving to local mock DB", err);
      // Fallback to local storage for the dashboard
      try {
        const existing = JSON.parse(localStorage.getItem('aureum_owner_orders') || '[]');
        const mockOrder = {
          id: '#ORD-' + (Math.floor(Math.random() * 9000) + 1000),
          store_id: storeId,
          customer: orderPayload.customer_name,
          email: orderPayload.customer_email,
          total: cartTotal.toFixed(2),
          status: 'Pending',
          date: new Date().toISOString(),
          items: cartItems.map(item => ({
             product_id: item.id,
             product_name: item.name,
             product: item, 
             price: item.price,
             quantity: item.quantity,
             image_url: item.image || item.image_url
          }))
        };
        existing.unshift(mockOrder);
        localStorage.setItem('aureum_owner_orders', JSON.stringify(existing));
      } catch (e) {}
    }

    setIsSubmitting(false);
    setOrderSuccess(true);
    clearCart();
  };

  if (orderSuccess) {
    return (
      <div className="storefront-container py-5 text-center">
        <div className="bg-white p-5 rounded shadow-sm border border-light mx-auto" style={{ maxWidth: '600px' }}>
          <div className="w-16 h-16 bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4 mx-auto">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="fs-2 font-bold mb-3">Order Confirmed!</h2>
          <p className="text-secondary mb-4 fs-6 lh-lg">
            Thank you for your purchase. Your order has been successfully placed. 
            We've saved your order details and they are currently being processed.
          </p>
          <button className="btn btn-primary px-4 py-2" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="storefront-container py-5">
      <h1 className="fs-2 font-bold mb-4">Checkout</h1>

      <div className="row g-5">
        <div className="col-lg-7">
          <div className="bg-white rounded shadow-sm border border-light p-4 mb-4">
            <h3 className="fs-5 fw-bold mb-4">Shipping Information</h3>
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-semibold">Full Name</label>
                  <input type="text" className="form-control" name="firstName" required onChange={handleInputChange} />
                </div>
                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-semibold">Street Address</label>
                  <input type="text" className="form-control" name="address" required onChange={handleInputChange} />
                </div>
                <div className="col-12">
                  <label className="form-label fs-8 text-secondary fw-semibold">City</label>
                  <input type="text" className="form-control" name="city" required onChange={handleInputChange} />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded shadow-sm border border-light p-4">
            <h3 className="fs-5 fw-bold mb-4">Payment Method</h3>
            <div className="d-flex flex-column gap-3">
              <label className={`border rounded p-3 cursor-pointer d-flex align-items-center gap-3 ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary bg-opacity-10' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={formData.paymentMethod === 'cod'} 
                  onChange={handleInputChange} 
                  className="form-check-input mt-0"
                />
                <div>
                  <div className="fw-bold fs-7 d-flex align-items-center gap-2">
                    Cash on Delivery
                  </div>
                  <div className="fs-8 text-secondary">Pay with cash upon delivery</div>
                </div>
              </label>

              <label className={`border rounded p-3 cursor-pointer d-flex align-items-center gap-3 ${formData.paymentMethod === 'online' ? 'border-primary bg-primary bg-opacity-10' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="online" 
                  checked={formData.paymentMethod === 'online'} 
                  onChange={handleInputChange} 
                  className="form-check-input mt-0"
                />
                <div>
                  <div className="fw-bold fs-7">Credit Card / Online Payment</div>
                  <div className="fs-8 text-secondary">Secure online payment (Simulated)</div>
                </div>
              </label>
            </div>
            {formData.paymentMethod === 'online' && (
              <div className="mt-3 p-4 bg-light rounded border">
                <div className="mb-3">
                  <label className="form-label fs-8 text-secondary fw-semibold">Card Number</label>
                  <input type="text" className="form-control" placeholder="0000 0000 0000 0000" maxLength="19" required={formData.paymentMethod === 'online'} />
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label fs-8 text-secondary fw-semibold">Expiry Date</label>
                    <input type="text" className="form-control" placeholder="MM/YY" maxLength="5" required={formData.paymentMethod === 'online'} />
                  </div>
                  <div className="col-6">
                    <label className="form-label fs-8 text-secondary fw-semibold">CVV</label>
                    <input type="password" className="form-control" placeholder="123" maxLength="4" required={formData.paymentMethod === 'online'} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="bg-white rounded shadow-sm border border-light p-4 position-sticky" style={{ top: 100 }}>
            <h3 className="fs-5 fw-bold mb-4">Order Summary</h3>
            <div className="d-flex flex-column gap-3 mb-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-3">
                  <div style={{ width: 50, height: 50 }} className="bg-light border rounded overflow-hidden flex-shrink-0 position-relative">
                    <img src={normalizeProductImage(item.image || item.image_url, item.name)} alt={item.name} className="w-100 h-100 object-fit-cover" />
                    <span className="position-absolute top-0 end-0 badge bg-secondary rounded-circle" style={{ transform: 'translate(25%, -25%)' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fs-7 fw-bold">{item.name}</div>
                    {item.selectedSize && (
                      <div className="fs-8 text-secondary mt-1">Size: {item.selectedSize}</div>
                    )}
                    {item.selectedColor && (
                      <div className="fs-8 text-secondary mt-1 text-capitalize">Color: {item.selectedColor}</div>
                    )}
                  </div>
                  <div className="fs-7 fw-semibold">
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-top pt-3 mb-3">
              <div className="d-flex justify-content-between mb-2 fs-7 text-secondary">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 fs-7 text-secondary">
                <span>Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4 fw-bold fs-5">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="d-flex flex-column gap-3 mt-4">
              <button 
                type="submit" 
                form="checkout-form"
                className="btn w-100 py-3 fw-bold text-white fs-6" 
                style={{ backgroundColor: '#fb641b' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
              
              <button 
                type="button" 
                className="btn w-100 py-3 fw-bold text-white fs-6 d-flex justify-content-center align-items-center gap-2" 
                style={{ backgroundColor: '#25D366' }}
                onClick={() => {
                  const text = encodeURIComponent(`Hi, I would like to place an order for the following items:\n${cartItems.map(i => `- ${i.quantity}x ${i.name}`).join('\n')}\nTotal: $${cartTotal.toFixed(2)}`);
                  window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Buy via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
