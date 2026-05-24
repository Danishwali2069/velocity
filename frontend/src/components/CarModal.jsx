import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function CarModal({ car, onClose }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  const inCart = car ? isInCart(car._id || car.id) : false;
  const wishlisted = car ? isWishlisted(car._id || car.id) : false;

  // Lock scroll
  useEffect(() => {
    if (car) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [car]);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleAdd = async () => {
    if (inCart) { addToast('Already in your garage!'); return; }
    await addItem(car);
    addToast(`${car.name} added to garage 🏎`);
    onClose();
  };

  const handleWish = async () => {
    await toggle(car._id || car.id);
    addToast(wishlisted ? 'Removed from wishlist' : `${car.name} added to wishlist ♥`);
  };

  const specItems = [
    { label: 'Horsepower', value: `${car?.specs?.hp} HP` },
    { label: '0–60 MPH', value: `${car?.specs?.acceleration}s` },
    { label: 'Top Speed', value: `${car?.specs?.topSpeed} MPH` },
    { label: 'Engine', value: car?.specs?.engine },
    { label: 'Transmission', value: car?.specs?.transmission },
    { label: 'Drivetrain', value: car?.specs?.drivetrain },
  ];

  return (
    <AnimatePresence>
      {car && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg"
              style={{
                background: 'linear-gradient(160deg,#070c14,#0a1120)',
                border: '1px solid rgba(255,107,0,0.2)',
                boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(255,107,0,0.1)',
              }}
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/15 text-white/40 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400 transition-all duration-300 flex items-center justify-center text-sm">
                ✕
              </button>

              {/* Car image */}
              <div className="relative h-64 flex items-center justify-center overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at 50% 80%,rgba(255,107,0,0.1),transparent)' }}>
                <motion.img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-contain p-8"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(255,107,0,0.35))' }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                />
                {/* Neon underlight */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-8"
                  style={{ background: 'radial-gradient(ellipse,rgba(255,107,0,0.3),transparent)', filter: 'blur(10px)' }} />
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-orbitron text-[10px] tracking-[5px] uppercase mb-1" style={{ color: '#ff6b00' }}>
                      {car.brand}
                    </div>
                    <h2 className="font-orbitron text-3xl font-black text-white">{car.name}</h2>
                  </div>
                  <div className="font-orbitron text-2xl font-black text-right"
                    style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ${car.price?.toLocaleString()}
                  </div>
                </div>

                {/* Stars + Category */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-yellow-400 text-sm tracking-widest">{'★'.repeat(Math.round(car.rating || 5))}</span>
                  <span className="text-white/30 font-orbitron text-[10px]">({car.reviewCount} reviews)</span>
                  {car.badge && (
                    <span className="px-2.5 py-0.5 font-orbitron text-[9px] tracking-widest uppercase text-white rounded-sm"
                      style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}>
                      {car.badge}
                    </span>
                  )}
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {specItems.map(({ label, value }) => value && (
                    <div key={label} className="text-center p-3 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="font-orbitron text-base font-bold" style={{ color: '#ffd700' }}>{value}</div>
                      <div className="font-orbitron text-[8px] tracking-widest uppercase text-white/35 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-white/50 font-rajdhani text-base leading-relaxed mb-6 tracking-wide">
                  {car.description}
                </p>

                {/* Colors */}
                {car.colors?.length > 0 && (
                  <div className="mb-6">
                    <div className="font-orbitron text-[9px] tracking-[4px] uppercase text-white/30 mb-3">Available Colors</div>
                    <div className="flex gap-3">
                      {car.colors.map(c => (
                        <div key={c} className="w-6 h-6 rounded-full border-2 border-white/20"
                          style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAdd}
                    className="flex-1 py-4 font-orbitron text-xs tracking-[4px] uppercase text-white rounded-sm"
                    style={{ background: inCart ? 'rgba(255,45,32,0.3)' : 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {inCart ? '✓ In Garage' : 'Add to Garage →'}
                  </motion.button>

                  <motion.button
                    onClick={handleWish}
                    className="px-6 py-4 font-orbitron text-xs tracking-[3px] uppercase rounded-sm border transition-all duration-300"
                    style={{
                      background: wishlisted ? 'rgba(255,45,32,0.15)' : 'transparent',
                      borderColor: wishlisted ? 'rgba(255,45,32,0.5)' : 'rgba(255,255,255,0.2)',
                      color: wishlisted ? '#ff2d20' : 'rgba(255,255,255,0.6)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {wishlisted ? '♥' : '♡'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
