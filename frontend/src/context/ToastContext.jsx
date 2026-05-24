import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9000] flex flex-col gap-3 items-center">
        {toasts.map((toast, i) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'linear-gradient(135deg, #ff2d20, #ff6b00)',
              transform: `translateY(${(toasts.length - 1 - i) * -8}px) scale(${1 - (toasts.length - 1 - i) * 0.03})`,
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}
            className="px-6 py-3 font-orbitron text-xs tracking-widest uppercase text-white rounded-sm cursor-pointer whitespace-nowrap"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};
