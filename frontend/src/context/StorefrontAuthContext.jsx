import React, { createContext, useContext, useState, useEffect } from 'react';

const StorefrontAuthContext = createContext();

export const useStorefrontAuth = () => useContext(StorefrontAuthContext);

export const StorefrontAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('storefront_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = async (email, password) => {
    const customerUser = { id: Date.now(), name: email.split('@')[0], email, role: 'customer' };
    setUser(customerUser);
    localStorage.setItem('storefront_user', JSON.stringify(customerUser));
    return { success: true, user: customerUser };
  };

  const register = async (name, email, password) => {
    const customerUser = { id: Date.now(), name, email, role: 'customer' };
    setUser(customerUser);
    localStorage.setItem('storefront_user', JSON.stringify(customerUser));
    return { success: true, user: customerUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('storefront_user');
  };

  const requireAuth = (callback) => {
    if (user && user.id) {
      if (typeof callback === 'function') callback();
      return true;
    } else {
      setIsLoginModalOpen(true);
      return false;
    }
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);

  return (
    <StorefrontAuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoginModalOpen,
        closeLoginModal,
        openLoginModal,
        requireAuth,
      }}
    >
      {children}
    </StorefrontAuthContext.Provider>
  );
};
