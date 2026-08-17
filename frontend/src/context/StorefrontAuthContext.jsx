import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const StorefrontAuthContext = createContext();

export const useStorefrontAuth = () => useContext(StorefrontAuthContext);

export const StorefrontAuthProvider = ({ children }) => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const requireAuth = (callback) => {
    // Treat 'admin' and 'owner' as authenticated too, but generally expecting 'customer'
    if (user && user.id) {
      if (typeof callback === 'function') callback();
      return true;
    } else {
      setIsLoginModalOpen(true);
      return false;
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <StorefrontAuthContext.Provider
      value={{
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
