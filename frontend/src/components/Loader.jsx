import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('Loading systems');

  useEffect(() => {
    const phases = ['Loading systems', 'Calibrating engine', 'Race mode active'];
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onDone, 500);
      }
      setProgress(Math.min(100, p));
      setPhase(phases[Math.floor((p / 100) * phases.length)] || phases[2]);
    }, 180);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
        style={{ background: '#030508' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-orbitron text-5xl font-black tracking-[12px] mb-10"
          style={{
            background: 'linear-gradient(135deg, #ff2d20, #ff6b00, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          VELOCITY
        </motion.div>

        {/* Wheel */}
        <div className="loader-wheel mb-8" />

        {/* Progress bar */}
        <div className="w-56 h-0.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff2d20, #ff6b00)' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>

        {/* Status */}
        <div className="font-orbitron text-[10px] tracking-[5px] uppercase"
          style={{ color: 'rgba(255,255,255,0.35)' }}>
          {phase}
        </div>

        {/* Decorative lines */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-8 w-px bg-orange-500"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
