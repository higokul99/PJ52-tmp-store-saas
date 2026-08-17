import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function StoreLayout() {
  return (
    <div className="d-flex store-manager-layout">
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <Navbar />
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}