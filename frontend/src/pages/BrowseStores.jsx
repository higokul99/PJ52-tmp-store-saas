import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../context/StoreContext';
import {
  Sparkles,
  Store as StoreIcon,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

// Gold theme constants
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F3D675';
const INK = '#050505';
const CREAM = '#f6f1e4';

export default function BrowseStores({ stores: initialStores = null, onSelectStore }) {
  const navigate = useNavigate();
  const { fetchStores } = React.useContext(StoreContext);
  const [stores, setStores] = useState(initialStores || []);
  const [loading, setLoading] = useState(!Array.isArray(initialStores) || initialStores.length === 0);

  useEffect(() => {
    if (Array.isArray(initialStores) && initialStores.length > 0) {
      setStores(initialStores);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (e) {
        console.error('Failed to load stores', e);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [initialStores]);

  if (loading) {
    return (
      <div style={{ background: INK, minHeight: '100vh', color: CREAM }} className="flex items-center justify-center">
        <div className="text-lg" style={{ color: GOLD_LIGHT }}>Loading stores...</div>
      </div>
    );
  }

  return (
    <div style={{ background: INK, color: CREAM, minHeight: '100vh' }} className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={24} style={{ color: GOLD }} />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Browse Stores</h1>
      </div>

      {stores.length === 0 ? (
        <div className="text-center py-12" style={{ color: '#a99f80' }}>
          <p>No stores are currently registered.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group rounded-xl border border-[#d4af37]/20 bg-[#0b0a08] p-4 hover:border-[#d4af37]/60 transition-all cursor-pointer"
              onClick={() => {
                if (onSelectStore) {
                  onSelectStore(store);
                } else {
                  navigate(`/store/${store.slug || store.id}`);
                }
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                {(store.logo && (store.name || store.store_name || '').toLowerCase().trim() !== 'ali livings') ? (
                  <img src={store.logo} alt={store.name || store.store_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <StoreIcon size={24} style={{ color: GOLD }} />
                )}
                <h2 className="text-lg font-semibold" style={{ color: GOLD_LIGHT }}>{store.name || store.store_name || 'Store'}</h2>
              </div>
              <p className="text-sm mb-2" style={{ color: '#a99f80' }}>{store.description || store.store_description || 'No description provided.'}</p>
              <div className="flex flex-col gap-1 text-xs" style={{ color: GOLD_LIGHT }}>
                <div className="flex items-center"><CheckCircle2 size={14} className="me-1" style={{ color: GOLD }} />{store.status || 'Active'}</div>
                <div className="flex items-center"><ShieldCheck size={14} className="me-1" style={{ color: GOLD }} />{store.subdomain ? `${store.subdomain}.storemanager.app` : 'No subdomain'}</div>
                {store.email && <div className="flex items-center"><span className="me-1">📧</span>{store.email}</div>}
                {store.phone && <div className="flex items-center"><span className="me-1">📞</span>{store.phone}</div>}
                {store.category && <div className="flex items-center"><span className="me-1">🏷️</span>{store.category}</div>}
                <div className="flex items-center"><span className="me-1">📦</span>{store.products_count ?? 0} products</div>
                <div className="flex items-center"><span className="me-1">🧾</span>{store.orders_count ?? 0} orders</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
