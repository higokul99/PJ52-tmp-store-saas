import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Store as StoreIcon,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Tag,
  Boxes,
  TrendingUp,
  Ticket,
  Globe,
  CreditCard
} from 'lucide-react';

export const ownerLinks = [
  { key: "dashboard", label: "Dashboard", path: "/owner/dashboard", icon: LayoutDashboard },
  { key: "stores", label: "Stores", path: "/stores", icon: StoreIcon },
  { key: "collections", label: "Collections", path: "/categories", icon: Tag },
  { key: "products", label: "Products", path: "/products", icon: Package },
  { key: "orders", label: "Orders", path: "/orders", icon: ShoppingCart },
  { key: "customers", label: "Customers", path: "/customers", icon: Users },
  { key: "bundles", label: "Bundles", path: "#", icon: Boxes },
  { key: "analytics", label: "Analytics", path: "#", icon: TrendingUp },
  { key: "discounts", label: "Discounts", path: "#", icon: Ticket },
  { key: "domain", label: "Domain Connection", path: "#", icon: Globe },
  { key: "payment", label: "Payment Gateway", path: "#", icon: CreditCard },
  { key: "settings", label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const displayName = user?.name || '';

  return (
    <aside className="w-64 min-w-[256px] min-h-screen bg-[#040404] text-[#8a7a4d] border-r border-[#d4af37]/20 flex flex-col justify-between p-4 z-40">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b border-[#d4af37]/15">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f3d675] via-[#d4af37] to-[#8a6d1f] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)] border border-[#f3d675]/40">
            <div className="w-4 h-4 rotate-45 border-2 border-[#050505] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#050505]" />
            </div>
          </div>
          <span className="text-lg font-bold tracking-[0.2em] text-white font-serif">AUREUM</span>
        </div>

        {/* Role Subtitle */}
        <div className="px-3 pt-2 pb-3 text-[11px] uppercase tracking-widest font-semibold text-[#8a7a4d]">
          {displayName}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {ownerLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === "/owner/dashboard" && location.pathname === "/dashboard");
            const Icon = link.icon;
            return (
              <NavLink
                key={link.key}
                to={link.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#d4af37]/15 text-[#f3d675] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] font-semibold"
                    : "text-[#a99f80] hover:text-white hover:bg-[#d4af37]/10"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#d4af37]" : "text-[#8a7a4d]"} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-[#d4af37]/15">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </NavLink>
      </div>
    </aside>
  );
}