const categories = [
  { name: "Fashion", products: 125, featured: true },
  { name: "Electronics", products: 84, featured: false },
  { name: "Home Decor", products: 60, featured: true },
];

function CategoriesPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <p className="eyebrow">Categories</p>
          <h1>Organize your catalog</h1>
        </div>
        <button className="btn btn-outline-primary">Add Category</button>
      </div>

      <div className="row g-4 mt-2">
        {categories.map((category) => (
          <div className="col-md-4" key={category.name}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5>{category.name}</h5>
                <p>{category.products} products</p>
                <span className={category.featured ? "badge" : "badge badge-soft"}>
                  {category.featured ? "Featured" : "Standard"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
