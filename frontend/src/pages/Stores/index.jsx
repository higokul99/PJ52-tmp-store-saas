const stores = [
  { name: "Glow Boutique", owner: "Mina Shah", domain: "glowboutique.shop", status: "Active" },
  { name: "Urban Cart", owner: "Aroob Khan", domain: "urbancart.shop", status: "Pending" },
  { name: "Modern Nest", owner: "Nadia Ali", domain: "modernnest.shop", status: "Active" },
];

function StoresPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Stores</p>
          <h1>Manage your online storefronts</h1>
        </div>
        <button className="btn btn-primary">Create New Store</button>
      </div>

      <div className="row g-4 mt-2">
        {stores.map((store) => (
          <div className="col-md-4" key={store.name}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{store.name}</h5>
                  <span className={store.status === "Active" ? "badge" : "badge badge-soft"}>{store.status}</span>
                </div>
                <p className="text-muted mb-2">Owner: {store.owner}</p>
                <p className="text-muted mb-0">Domain: {store.domain}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoresPage;
