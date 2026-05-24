import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('velocity_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('velocity_token');
      localStorage.removeItem('velocity_user');
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateMe: (data) => api.put('/auth/me', data),
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getOne: (slug) => api.get(`/products/${slug}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// ── Cart ──────────────────────────────────────────────────────────────────────
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId, qty = 1, color = '') => api.post('/cart/add', { productId, qty, color }),
  remove: (productId) => api.delete(`/cart/remove/${productId}`),
  clear: () => api.delete('/cart/clear'),
};

// ── Wishlist ──────────────────────────────────────────────────────────────────
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  toggle: (productId) => api.post(`/wishlist/toggle/${productId}`),
};

export default api;
