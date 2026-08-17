import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    placeOrder,
    loading
  } = useCart();

  const { activeStore, formatPrice } = useStore();

  const [checkoutStep, setCheckoutStep] = useState(false); // false: Cart, true: Checkout Form
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await placeOrder(customer);
    if (res.success) {
      setOrderSuccess(res.order);
      setCheckoutStep(false);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer p-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <h5 className="fw-bold m-0">
            {orderSuccess ? '🎉 Order Placed!' : (checkoutStep ? '🛍️ Quick Checkout' : '🛒 Shopping Cart')}
          </h5>
          <button
            className="btn-close"
            onClick={() => {
              setIsCartOpen(false);
              setOrderSuccess(null);
              setCheckoutStep(false);
            }}
          ></button>
        </div>

        {orderSuccess ? (
          <div className="my-auto text-center py-4">
            <div className="display-3 mb-3">✅</div>
            <h4 className="fw-bold text-success">Thank You for Your Order!</h4>
            <p className="text-muted mb-3">
              Order Number: <strong className="text-dark">{orderSuccess.order_number}</strong>
            </p>
            <div className="p-3 bg-light rounded text-start mb-4 fs-7">
              <div><strong>Store:</strong> {activeStore?.name}</div>
              <div><strong>Total Paid:</strong> {formatPrice(orderSuccess.total_amount)}</div>
              <div><strong>Status:</strong> <span className="badge badge-shopify-warning">Pending Processing</span></div>
            </div>
            <button
              className="btn btn-shopify w-100"
              onClick={() => {
                setIsCartOpen(false);
                setOrderSuccess(null);
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : checkoutStep ? (
          /* Checkout Form */
          <form onSubmit={handleCheckoutSubmit} className="d-flex flex-column flex-grow-1">
            {errorMsg && <div className="alert alert-danger py-2 fs-7">{errorMsg}</div>}
            
            <div className="flex-grow-1 overflow-auto pe-1">
              <div className="mb-3">
                <label className="form-label fw-semibold fs-7">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. John Doe"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold fs-7">Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="john@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold fs-7">Phone Number *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold fs-7">Shipping Address *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  required
                  placeholder="Street, City, Zip Code..."
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                ></textarea>
              </div>

              {/* Summary box */}
              <div className="p-3 bg-light rounded mb-3 border fs-7">
                <div className="d-flex justify-content-between mb-1">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Estimated Tax (5%):</span>
                  <span>{formatPrice(cartSubtotal * 0.05)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold pt-2 border-top">
                  <span>Total Amount:</span>
                  <span className="text-success">{formatPrice(cartSubtotal * 1.05)}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-top d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setCheckoutStep(false)}
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="btn btn-shopify flex-grow-1"
                disabled={loading}
              >
                {loading ? 'Processing Order...' : `Place Order (${formatPrice(cartSubtotal * 1.05)})`}
              </button>
            </div>
          </form>
        ) : (
          /* Cart List */
          <div className="d-flex flex-column flex-grow-1">
            {cartItems.length === 0 ? (
              <div className="my-auto text-center py-5">
                <div className="display-4 text-muted mb-3">🛒</div>
                <h6 className="fw-semibold text-muted">Your cart is currently empty</h6>
                <p className="text-secondary fs-7">Browse products and add items to get started!</p>
              </div>
            ) : (
              <>
                <div className="flex-grow-1 overflow-auto pe-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
                      <img
                        src={item.product?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                        alt={item.product?.name}
                        className="rounded"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="fw-bold m-0 fs-6">{item.product?.name || 'Product'}</h6>
                        <div className="text-success fw-semibold fs-7 mb-1">
                          {formatPrice(item.price)}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div className="input-group input-group-sm" style={{ width: '90px' }}>
                            <button
                              className="btn btn-outline-secondary px-2"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >-</button>
                            <span className="input-group-text bg-white px-2 fw-bold">{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary px-2"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >+</button>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold fs-6">{formatPrice(item.price * item.quantity)}</div>
                        <button
                          className="btn btn-link text-danger p-0 mt-1 fs-7 text-decoration-none"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-top">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-6">Subtotal</span>
                    <span className="fw-bold fs-5">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <p className="text-secondary fs-7 mb-3">Taxes and shipping calculated at checkout.</p>

                  <button
                    className="btn btn-shopify w-100 py-2.5 fw-bold"
                    onClick={() => setCheckoutStep(true)}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
