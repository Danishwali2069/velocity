import { useEffect, useRef, useState, useCallback } from 'react';
import { productsAPI } from '../utils/api';

// ── Scroll reveal via IntersectionObserver ────────────────────────────────────
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ── Mouse parallax ────────────────────────────────────────────────────────────
export function useParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength * 0.5;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [strength]);

  return offset;
}

// ── Products fetching ─────────────────────────────────────────────────────────
export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, page: 1 });

  const fetch = useCallback(async (overrides = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await productsAPI.getAll({ ...params, ...overrides });
      setProducts(data.products);
      setPagination({ total: data.total, pages: data.pages, page: data.page });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cars');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { products, loading, error, pagination, refetch: fetch };
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ── GSAP scroll progress ──────────────────────────────────────────────────────
export function useScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const prog = Math.max(0, Math.min(1, (winH - top) / (winH + height)));
      setProgress(prog);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sectionRef]);

  return progress;
}

// ── Window scroll position ────────────────────────────────────────────────────
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}
