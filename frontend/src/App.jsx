import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import CartPanel from './components/CartPanel';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Routes with animated transitions
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/fleet" element={<PageTransition><FleetPage /></PageTransition>} />
        <Route path="/car/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

// Layout with nav + footer
function Layout() {
  const location = useLocation();
  const noFooter = ['/auth'];
  const showFooter = !noFooter.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Navbar />
      <CartPanel />
      <main>
        <AnimatedRoutes />
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <CustomCursor />
              <AnimatePresence>
                {!loaded && (
                  <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                    <Loader onDone={() => setLoaded(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
              {loaded && <Layout />}
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
