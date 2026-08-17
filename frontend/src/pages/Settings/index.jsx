function SettingsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Configure your store platform</h1>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>Store Preferences</h5>
              <p>Set your domain, SEO defaults, and display settings.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>Payments & Shipping</h5>
              <p>Connect checkout, gateways, and delivery options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
