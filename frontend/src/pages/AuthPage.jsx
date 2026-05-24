import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const FEATURES = [
  'Early access to new model drops',
  'Exclusive track day invitations',
  'Personalized performance reports',
  'Priority concierge support',
  'Member-only pricing',
];

export default function AuthPage() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.email || !form.password) { addToast('Please fill all fields'); return; }
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
        addToast('Welcome back, Driver! 🏎');
      } else {
        if (!form.name) { addToast('Name is required'); setLoading(false); return; }
        await register(form.name, form.email, form.password);
        addToast('Welcome to the elite circle!');
      }
      navigate('/');
    } catch (err) {
      addToast(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
      style={{ background: '#030508' }}
    >
      {/* Background */}
      <div className="hero-grid absolute inset-0 opacity-25" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 50%,rgba(255,45,32,0.05),transparent 60%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className="no-underline">
            <div
              className="font-orbitron text-2xl font-black tracking-[5px] mb-10"
              style={{
                background: 'linear-gradient(135deg,#ff2d20,#ff6b00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VELOCITY
            </div>
          </Link>

          <div className="eyebrow mb-3">Members Only</div>
          <h1
            className="font-orbitron font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}
          >
            <span className="gradient-text-white">Join the </span>
            <span className="gradient-text">Elite Circle</span>
          </h1>
          <p className="font-rajdhani text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Exclusive access to the world's most extraordinary performance vehicles.
            Built for drivers who demand more.
          </p>

          <div className="flex flex-col gap-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f}
                className="flex items-center gap-3 text-white/60 font-rajdhani text-sm tracking-wide"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}
                />
                {f}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-lg p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Tabs */}
          <div
            className="flex mb-8 rounded-sm overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            {['login', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-3 font-orbitron text-[10px] tracking-[4px] uppercase transition-all duration-300"
                style={{
                  background: tab === t ? 'linear-gradient(135deg,#ff2d20,#ff6b00)' : 'transparent',
                  color: tab === t ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-5">
                {tab === 'signup' && (
                  <div>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Velocity"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onKeyDown={handleKey}
                    />
                  </div>
                )}

                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="driver@velocity.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onKeyDown={handleKey}
                  />
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    onKeyDown={handleKey}
                  />
                </div>

                {tab === 'login' && (
                  <div className="flex justify-end">
                    <button className="font-orbitron text-[9px] tracking-widest uppercase transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ff6b00'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 mt-2 font-orbitron text-xs tracking-[4px] uppercase text-white rounded-sm transition-all duration-300 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}
                  whileHover={{ scale: 1.01, boxShadow: '0 12px 32px rgba(255,107,0,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        style={{ animation: 'spin 0.6s linear infinite' }} />
                      Processing...
                    </span>
                  ) : (
                    tab === 'login' ? 'Access Garage →' : 'Join the Elite →'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <p
            className="text-center font-rajdhani text-sm mt-6"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            {tab === 'login' ? "Don't have an account? " : 'Already a member? '}
            <button
              onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
              className="font-orbitron text-[10px] tracking-widest uppercase transition-colors duration-200 ml-1"
              style={{ color: '#ff6b00', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {tab === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
