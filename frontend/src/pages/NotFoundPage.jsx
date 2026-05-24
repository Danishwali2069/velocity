import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#030508' }}
    >
      <div className="hero-grid absolute inset-0 opacity-20" />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="font-orbitron font-black mb-4 select-none"
          style={{
            fontSize: 'clamp(6rem,20vw,14rem)',
            lineHeight: 1,
            background: 'linear-gradient(135deg,rgba(255,45,32,0.15),rgba(255,107,0,0.15))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>

        <div className="eyebrow mb-4">Off Track</div>
        <h1 className="font-orbitron text-2xl font-black text-white mb-4">
          You've Left the Circuit
        </h1>
        <p className="font-rajdhani text-base mb-10 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
          The page you're looking for doesn't exist or has been moved to a different track.
        </p>

        <Link to="/">
          <button
            className="btn-primary"
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,0,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <span>Back to Start Line →</span>
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
