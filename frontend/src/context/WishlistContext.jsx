import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      wishlistAPI.get()
        .then(({ data }) => setIds(data.map(p => p._id || p)))
        .catch(console.error);
    } else {
      try {
        setIds(JSON.parse(localStorage.getItem('velocity_wishlist') || '[]'));
      } catch { setIds([]); }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) localStorage.setItem('velocity_wishlist', JSON.stringify(ids));
  }, [ids, isAuthenticated]);

  const toggle = useCallback(async (productId) => {
    const toggleLocal = () => {
      setIds(prev =>
        prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
      );
    };

    if (isAuthenticated) {
      try {
        const { data } = await wishlistAPI.toggle(productId);
        setIds(data.wishlist);
      } catch {
        toggleLocal();
      }
    } else {
      toggleLocal();
    }
  }, [isAuthenticated]);

  const isWishlisted = (productId) => ids.includes(productId);

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
