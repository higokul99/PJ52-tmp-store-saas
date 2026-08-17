function CartPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Checkout experience overview</h1>
        </div>
      </div>

      <div className="card shadow-sm mt-3 p-4">
        <h5>Current cart summary</h5>
        <ul className="mb-0">
          <li>2 items in progress</li>
          <li>Shipping calculated at checkout</li>
          <li>Discount codes supported</li>
        </ul>
      </div>
    </div>
  );
}

export default CartPage;
