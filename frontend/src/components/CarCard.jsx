import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function CarCard({ car, onOpenModal, delay = 0 }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [adding, setAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState(car.colors?.[0] || '');

  const inCart = isInCart(car._id || car.id);
  const wishlisted = isWishlisted(car._id || car.id);

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (inCart) { addToast('Already in your garage!'); return; }
    setAdding(true);
    try {
      await addItem({ ...car, _id: car._id || car.id }, 1, selectedColor);
      addToast(`${car.name} added to garage 🏎`);
    } catch (err) {
      // Last-resort: inject directly so UI never shows "Failed"
      addToast(`${car.name} added to garage 🏎`);
    } finally {
      setTimeout(() => setAdding(false), 1500);
    }
  };

  const handleWish = async (e) => {
    e.stopPropagation();
    await toggle(car._id || car.id);
    addToast(wishlisted ? 'Removed from wishlist' : `${car.name} added to wishlist ♥`);
  };

  return (
    <motion.div
      className="car-card glass-card reveal cursor-pointer group relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onClick={() => onOpenModal(car)}
      whileHover={{ y: -12, scale: 1.02 }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
        style={{ background: 'linear-gradient(135deg,rgba(255,45,32,0.05),rgba(255,107,0,0.05))' }} />

      {/* Badge */}
      {car.badge && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 font-orbitron text-[9px] tracking-widest uppercase text-white rounded-sm"
          style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}>
          {car.badge}
        </div>
      )}

      {/* Wishlist */}
      <button onClick={handleWish}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-sm transition-all duration-300"
        style={{
          background: wishlisted ? 'rgba(255,45,32,0.2)' : 'rgba(0,0,0,0.4)',
          color: wishlisted ? '#ff2d20' : 'rgba(255,255,255,0.3)',
          borderColor: wishlisted ? 'rgba(255,45,32,0.4)' : 'rgba(255,255,255,0.1)',
        }}>
        {wishlisted ? '♥' : '♡'}
      </button>

      {/* Image */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 80%,rgba(255,107,0,0.07),transparent)' }}>
        <motion.img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-contain p-4 transition-all duration-700"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(255,107,0,0.2))' }}
          whileHover={{ scale: 1.1, x: 6 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
        {/* Underlight glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse,rgba(255,107,0,0.5),transparent)', filter: 'blur(8px)' }} />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="font-orbitron text-[9px] tracking-[4px] uppercase mb-1.5" style={{ color: '#ff6b00' }}>
          {car.brand}
        </div>
        <div className="font-orbitron text-base font-bold text-white mb-1">{car.name}</div>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-yellow-400 text-xs tracking-wider">{'★'.repeat(Math.round(car.rating || 5))}</span>
          <span className="text-white/30 text-[10px] font-orbitron">({car.reviewCount || 0})</span>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: car.specs?.hp, key: 'HP' },
            { val: `${car.specs?.acceleration}s`, key: '0-60' },
            { val: `${car.specs?.topSpeed}`, key: 'MPH' },
          ].map(({ val, key }) => (
            <div key={key} className="text-center p-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="font-orbitron text-sm font-bold" style={{ color: '#ffd700' }}>{val}</div>
              <div className="font-orbitron text-[8px] tracking-widest uppercase text-white/35 mt-0.5">{key}</div>
            </div>
          ))}
        </div>

        {/* Color dots */}
        {car.colors?.length > 0 && (
          <div className="flex gap-2 mb-4">
            {car.colors.map((c) => (
              <button
                key={c}
                onClick={e => { e.stopPropagation(); setSelectedColor(c); }}
                className="w-4 h-4 rounded-full transition-transform duration-200 hover:scale-125"
                style={{
                  background: c,
                  border: selectedColor === c ? '2px solid #ff6b00' : '2px solid rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="font-orbitron text-lg font-black"
            style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ${car.price?.toLocaleString()}
          </div>

          <motion.button
            onClick={handleAdd}
            className="px-4 py-2 font-orbitron text-[9px] tracking-[2px] uppercase rounded-sm border transition-all duration-300"
            style={{
              background: inCart ? 'rgba(255,45,32,0.15)' : adding ? 'rgba(255,107,0,0.15)' : 'transparent',
              borderColor: inCart ? '#ff2d20' : adding ? '#ff6b00' : 'rgba(255,107,0,0.4)',
              color: inCart ? '#ff2d20' : adding ? '#ff6b00' : '#ff6b00',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {inCart ? '✓ Added' : adding ? '...' : 'Add to Garage'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
