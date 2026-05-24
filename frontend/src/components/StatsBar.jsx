import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(1, elapsed / duration);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  { label: 'Cars in Fleet', target: 48, suffix: '+' },
  { label: 'Happy Drivers', target: 12400, suffix: '+' },
  { label: 'Countries', target: 32, suffix: '' },
  { label: 'Track Records', target: 7, suffix: '' },
];

export default function StatsBar() {
  return (
    <section className="py-20 px-6" style={{ background: '#030508' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ label, target, suffix }, i) => (
          <motion.div
            key={label}
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <div
              className="font-orbitron font-black mb-2"
              style={{
                fontSize: 'clamp(2rem,4vw,3rem)',
                background: 'linear-gradient(135deg,#ff2d20,#ff6b00,#ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <Counter target={target} suffix={suffix} />
            </div>
            <div
              className="font-orbitron text-[9px] tracking-[4px] uppercase"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
