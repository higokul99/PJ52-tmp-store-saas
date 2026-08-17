import React from 'react';
import { Search, Mail, Bell, ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="store-topbar">
      <div className="topbar-search-box">
        <Search className="topbar-search-icon" size={16} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="topbar-right-actions">
        <button className="topbar-icon-btn" aria-label="Mail">
          <Mail size={18} />
        </button>

        <button className="topbar-icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-badge">1</span>
        </button>

        <div className="user-profile-pill">
          <img
            src="/sarah_avatar.png"
            alt="Sarah J."
            className="user-avatar"
          />
          <span className="user-name">Sarah J.</span>
          <ChevronDown size={14} className="text-muted ms-1" />
        </div>
      </div>
    </header>
  );
}