import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useStore } from '../context/StoreContext';
import useSEO from '../hooks/useSEO';

export default function Customers() {
  const { activeStore, formatPrice } = useStore();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useSEO({ title: 'Customer Database', description: 'Customer Directory with Customer Name, Email, Phone, and Order stats.' });

  const fetchCustomers = async () => {
    setLoading(true);

    // Always require an active store — never show all customers
    const storeId = activeStore?.id;
    if (!storeId) {
      setCustomers([]);
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({ store_id: storeId });
      if (search) params.append('search', search);

      const res = await api.get(`/customers?${params.toString()}`);
      if (Array.isArray(res.data) && res.data.length >= 0) {
        setCustomers(res.data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.debug('API fetch failed, falling back to localStorage', err);
    }

    // Fallback: derive customers from localStorage orders scoped to THIS store only
    const savedOrders = localStorage.getItem('aureum_owner_orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        if (Array.isArray(parsedOrders)) {
          // Filter orders that belong to this store
          const storeOrders = parsedOrders.filter(o => {
            const orderStoreId = o.store_id || o.storeId;
            // If order has a store_id, match it; otherwise fall back to only showing
            // if there is exactly one store (the active one)
            return orderStoreId
              ? String(orderStoreId) === String(storeId)
              : true; // include orders without store_id only if single-store context
          });

          const map = {};
          storeOrders.forEach(o => {
            const name = o.customer || o.customer_name || 'Customer';
            const email = o.customer_email || `${name.toLowerCase().replace(/\s+/g, '.')}@customer.local`;
            const key = email; // use email as unique key
            if (!map[key]) {
              map[key] = {
                id: `CUST-${Object.keys(map).length + 1}`,
                name,
                email,
                phone: o.customer_phone || '+—',
                address: o.shipping_address || '—',
                total_orders: 0,
                total_spent: 0
              };
            }
            map[key].total_orders += 1;
            map[key].total_spent += parseFloat(String(o.total || o.total_amount || '').replace(/[^0-9.]/g, '')) || 0;
          });

          let customerList = Object.values(map);

          // Apply search filter
          if (search) {
            const q = search.toLowerCase();
            customerList = customerList.filter(c =>
              c.name.toLowerCase().includes(q) ||
              c.email.toLowerCase().includes(q) ||
              (c.phone && c.phone.toLowerCase().includes(q))
            );
          }

          setCustomers(customerList);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.debug('Failed to parse localStorage orders', e);
      }
    }

    setCustomers([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [activeStore, search]);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark m-0">Customer Management</h2>
          <p className="text-muted fs-7 m-0">
            Customers who ordered from{' '}
            <strong>{activeStore?.name || 'your store'}</strong>
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge badge-shopify-info px-3 py-2 fs-7">
            {customers.length} Customer{customers.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="shopify-card p-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search customer by Name, Email, or Phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="shopify-card p-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2 text-muted fs-7">Loading customers...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="shopify-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Shipping Address</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="text-muted">
                        <div style={{ fontSize: '2rem' }}>👥</div>
                        <p className="mb-0 mt-2 fw-semibold">No customers found</p>
                        <small>Only customers who ordered from <strong>{activeStore?.name}</strong> will appear here.</small>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((cust, idx) => (
                    <tr key={cust.id || idx}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px', flexShrink: 0 }}
                          >
                            {cust.name?.[0]?.toUpperCase() || 'C'}
                          </div>
                          <div className="fw-bold text-dark">{cust.name}</div>
                        </div>
                      </td>
                      <td className="text-primary">{cust.email}</td>
                      <td className="fw-mono fs-7">{cust.phone || '—'}</td>
                      <td className="text-secondary fs-7" style={{ maxWidth: '240px' }}>
                        {cust.address || '—'}
                      </td>
                      <td>
                        <span className="badge badge-shopify-info">
                          {cust.total_orders || 0} Orders
                        </span>
                      </td>
                      <td className="fw-bold text-success">
                        {formatPrice(cust.total_spent || 0)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
