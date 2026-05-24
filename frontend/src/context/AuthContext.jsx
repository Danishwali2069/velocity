import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('velocity_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('velocity_token');
    if (!token) { setLoading(false); return; }
    authAPI.me()
      .then(({ data }) => { setUser(data); localStorage.setItem('velocity_user', JSON.stringify(data)); })
      .catch(() => { localStorage.removeItem('velocity_token'); localStorage.removeItem('velocity_user'); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    const { data } = await authAPI.login({ email, password });
    localStorage.setItem('velocity_token', data.token);
    localStorage.setItem('velocity_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    setError(null);
    const { data } = await authAPI.register({ name, email, password });
    localStorage.setItem('velocity_token', data.token);
    localStorage.setItem('velocity_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('velocity_token');
    localStorage.removeItem('velocity_user');
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, error, isAuthenticated, isAdmin, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
