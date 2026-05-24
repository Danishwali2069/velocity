import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load cart from server when logged in, or from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      cartAPI.get()
        .then(({ data }) => setItems(data.items || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      try {
        const local = JSON.parse(localStorage.getItem('velocity_cart') || '[]');
        setItems(local);
      } catch { setItems([]); }
    }
  }, [isAuthenticated]);

  // Persist local cart
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('velocity_cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addItem = useCallback(async (product, qty = 1, color = '') => {
    const pid = product._id || product.id || product.slug || product.name;
    const normalize = (item) => item.product?._id || item.product?.id || item.product?.slug || item.product?.name;

    const addLocal = () => {
      setItems(prev => {
        const exists = prev.find(i => normalize(i) === pid);
        if (exists) return prev.map(i => normalize(i) === pid ? { ...i, qty: i.qty + qty } : i);
        return [...prev, { product, qty, color }];
      });
    };

    if (isAuthenticated) {
      try {
        const { data } = await cartAPI.add(pid, qty, color);
        setItems(data.items || []);
      } catch {
        // API unavailable — fall back to local
        addLocal();
      }
    } else {
      addLocal();
    }
  }, [isAuthenticated]);

  const removeItem = useCallback(async (productId) => {
    const removeLocal = () => {
      setItems(prev => prev.filter(i => {
        const pid = i.product?._id || i.product?.id || i.product?.slug || i.product?.name;
        return pid !== productId;
      }));
    };

    if (isAuthenticated) {
      try {
        const { data } = await cartAPI.remove(productId);
        setItems(data.items || []);
      } catch {
        removeLocal();
      }
    } else {
      removeLocal();
    }
  }, [isAuthenticated]);

  const clearCart = useCallback(async () => {
    if (isAuthenticated) await cartAPI.clear();
    setItems([]);
  }, [isAuthenticated]);

  const total = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.qty;
  }, 0);

  const count = items.reduce((sum, item) => sum + item.qty, 0);

  const isInCart = (productId) => items.some(i => {
    const pid = i.product?._id || i.product?.id || i.product?.slug || i.product?.name;
    return pid === productId;
  });

  return (
    <CartContext.Provider value={{
      items, total, count, isOpen, loading,
      setIsOpen, addItem, removeItem, clearCart, isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
