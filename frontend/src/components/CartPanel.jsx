import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function CartPanel() {
  const { items, total, isOpen, setIsOpen, removeItem, clearCart } = useCart();
  const { addToast } = useToast();

  const handleRemove = async (productId, name) => {
    await removeItem(productId);
    addToast(`${name} removed from garage`);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[39] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <motion.div
        className="fixed top-0 right-0 h-screen z-40 flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: 'linear-gradient(160deg, #070c14 0%, #0a1120 100%)',
          borderLeft: '1px solid rgba(255,107,0,0.15)',
        }}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <div className="font-orbitron text-sm font-bold tracking-[4px] uppercase text-white">Garage</div>
            <div className="font-orbitron text-[10px] tracking-widest text-white/30 mt-0.5">
              {items.length} {items.length === 1 ? 'vehicle' : 'vehicles'}
            </div>
          </div>
          <button onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full border border-white/15 text-white/50 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center text-sm">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">🏎</div>
              <div className="font-orbitron text-xs tracking-[4px] uppercase text-white/25">Your garage is empty</div>
              <div className="text-white/20 text-sm mt-2 font-rajdhani">Add some cars to get started</div>
            </div>
          ) : (
            <AnimatePresence>
              {items.map(({ product, qty, color }) => (
                <motion.div
                  key={product._id || product.id}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0 }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-white/5 group transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.025)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,0,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                >
                  <div className="w-20 h-14 rounded flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'radial-gradient(ellipse at 50% 80%,rgba(255,107,0,0.1),transparent)' }}>
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-orbitron text-[10px] tracking-widest text-orange-400 uppercase">{product.brand}</div>
                    <div className="font-orbitron text-sm font-bold text-white truncate">{product.name}</div>
                    <div className="font-orbitron text-sm mt-0.5"
                      style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      ${product.price?.toLocaleString()}
                    </div>
                    {color && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: color }} />
                        <span className="text-white/30 text-[10px] uppercase tracking-widest font-orbitron">Selected color</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemove(product._id || product.id, product.name)}
                    className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400 transition-all duration-200 text-sm p-1"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-orbitron text-[10px] tracking-[4px] uppercase text-white/40">Total</span>
              <span className="font-orbitron text-2xl font-black"
                style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ${total.toLocaleString()}
              </span>
            </div>

            <button
              className="w-full py-4 font-orbitron text-xs tracking-[4px] uppercase text-white rounded-sm transition-all duration-300"
              style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,0,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              Checkout Now →
            </button>

            <button onClick={clearCart}
              className="w-full py-2 font-orbitron text-[10px] tracking-widest uppercase text-white/25 hover:text-red-400 transition-colors duration-300">
              Clear Garage
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
