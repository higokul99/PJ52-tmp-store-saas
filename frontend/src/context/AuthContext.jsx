import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

const getStableUserId = (email = '', fallbackId = 1) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) return fallbackId;

  try {
    const saved = localStorage.getItem('shopnest_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.email && String(parsed.email).trim().toLowerCase() === normalizedEmail) {
        return parsed.id ?? fallbackId;
      }
    }
  } catch (error) {
    console.debug('Failed to read persisted user for stable ID', error);
  }

  let hash = 0;
  for (let index = 0; index < normalizedEmail.length; index += 1) {
    hash = (hash << 5) - hash + normalizedEmail.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash % 900000) + 100000;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopnest_user');
    return saved ? JSON.parse(saved) : { id: 1, name: 'Sarah J.', email: 'sarah@margasstore.com', role: 'admin' };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('shopnest_token');
      if (token) {
        try {
          const res = await api.get('/me');
          setUser(res.data);
          localStorage.setItem('shopnest_user', JSON.stringify(res.data));
        } catch (err) {
          console.debug("Auth check failed", err);
        }
      } else {
        const defaultAdmin = { id: 1, name: 'Sarah J.', email: 'sarah@margasstore.com', role: 'admin' };
        setUser(defaultAdmin);
        localStorage.setItem('shopnest_user', JSON.stringify(defaultAdmin));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/login', { email, password });
      const { user, token } = res.data;
      localStorage.setItem('shopnest_token', token);
      localStorage.setItem('shopnest_user', JSON.stringify(user));
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const normalizedEmail = (email || '').toLowerCase().trim();
      const isDemo = !email || normalizedEmail.includes('@shopnest.local') || normalizedEmail.includes('admin') || normalizedEmail.includes('owner') || normalizedEmail.includes('customer');
      const role = normalizedEmail.includes('customer') ? 'customer' : normalizedEmail.includes('admin') ? 'admin' : 'owner';
      let existingName = null;
      let existingRole = role;
      let existingPassword = null;
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('aureum_registered_users') || '{}');
        if (registeredUsers[normalizedEmail]) {
          existingName = registeredUsers[normalizedEmail].name;
          existingRole = registeredUsers[normalizedEmail].role;
          existingPassword = registeredUsers[normalizedEmail].password;
        } else if (normalizedEmail === 'admin@gmail.com') {
          // Hardcoded admin
          existingName = 'Sarah J.';
          existingRole = 'admin';
          existingPassword = 'admin';
        }
      } catch (e) {}

      // Enforce registration
      if (!existingPassword) {
        return { success: false, message: 'Account not found. Please register first.' };
      }

      // Password Validation
      if (existingPassword !== password) {
        return { success: false, message: 'Incorrect password for this email address.' };
      }

      const validUser = {
        id: getStableUserId(normalizedEmail, 1),
        name: existingName,
        email: normalizedEmail,
        role: existingRole,
      };

      const demoToken = 'demo-token-' + Date.now();
      localStorage.setItem('shopnest_token', demoToken);
      localStorage.setItem('shopnest_user', JSON.stringify(validUser));
      setUser(validUser);
      return { success: true, user: validUser };
    }
  };

  const register = async (name, email, password, role = 'owner', storeName = null, storeDescription = '') => {
    try {
      const payload = { name, email, password, role, store_name: storeName, store_description: storeDescription };
      const res = await api.post('/register', payload);
      const { user, token } = res.data;
      localStorage.setItem('shopnest_token', token);
      localStorage.setItem('shopnest_user', JSON.stringify(user));
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const newUser = {
        id: getStableUserId(normalizedEmail, 1),
        name: name || 'Aureum User',
        email: email || 'user@aureum.local',
        role,
        password: password, // Save password for local validation
        stores: role === 'owner' ? [{
          id: getStableUserId(normalizedEmail, 1) + 1,
          name: storeName || `${name}'s Store`,
          owner_name: name,
        }] : [],
      };
      
      // Persist to a mock database in localStorage so it survives logout
      try {
        const existingUsers = JSON.parse(localStorage.getItem('aureum_registered_users') || '{}');
        existingUsers[normalizedEmail] = newUser;
        localStorage.setItem('aureum_registered_users', JSON.stringify(existingUsers));
      } catch (e) {}

      const newToken = 'demo-token-' + Date.now();
      localStorage.setItem('shopnest_token', newToken);
      localStorage.setItem('shopnest_user', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('shopnest_token');
    localStorage.removeItem('shopnest_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: { id: 1, name: 'Sarah J.', email: 'sarah@margasstore.com', role: 'admin' }, loading: false };
  }
  return context;
};
