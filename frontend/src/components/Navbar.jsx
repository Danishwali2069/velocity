import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useScrollY } from '../hooks';

export default function Navbar() {
  const scrollY = useScrollY();
  const { count, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 60;

  const links = [
    { label: 'Fleet', to: '/fleet' },
    { label: 'Experience', to: '/#race-section' },
    { label: 'About', to: '/about' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-8 md:px-12 py-5 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(3,5,8,0.96)' : 'linear-gradient(to bottom, rgba(3,5,8,0.85), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,107,0,0.08)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="font-orbitron text-xl font-black tracking-[5px] no-underline"
          style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          VELOCITY
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="no-underline font-orbitron text-[10px] tracking-[3px] uppercase relative transition-colors duration-300"
                style={{ color: location.pathname === to ? '#fff' : 'rgba(255,255,255,0.5)' }}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: location.pathname === to ? '100%' : '0',
                    background: 'linear-gradient(90deg,#ff2d20,#ff6b00)',
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="font-orbitron text-[10px] tracking-widest text-white/50 uppercase">
                {user.name}
              </span>
              <button onClick={logout}
                className="font-orbitron text-[10px] tracking-[3px] uppercase text-white/40 hover:text-neon-red transition-colors duration-300">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:block font-orbitron text-[10px] tracking-[3px] uppercase text-white/50 hover:text-white transition-colors duration-300">
              Sign In
            </Link>
          )}

          {/* Cart button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 font-orbitron text-[10px] tracking-[3px] uppercase text-white transition-all duration-300 rounded-sm border"
            style={{ borderColor: 'rgba(255,107,0,0.35)', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,0,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Garage
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white font-orbitron text-[9px]"
                style={{ background: '#ff2d20' }}
              >
                {count}
              </motion.span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-px w-6 bg-white"
                animate={{
                  rotate: mobileOpen && i === 0 ? 45 : mobileOpen && i === 2 ? -45 : 0,
                  y: mobileOpen && i === 0 ? 8 : mobileOpen && i === 2 ? -8 : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center"
            style={{ background: 'rgba(3,5,8,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-5 right-6 text-white/50 text-2xl" onClick={() => setMobileOpen(false)}>✕</button>
            <ul className="flex flex-col items-center gap-8 list-none">
              {links.map(({ label, to }, i) => (
                <motion.li key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}>
                  <Link to={to} onClick={() => setMobileOpen(false)}
                    className="font-orbitron text-2xl font-bold tracking-widest uppercase text-white no-underline">
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
