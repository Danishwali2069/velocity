import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Marcus Chen',
    role: 'Le Mans Driver',
    initials: 'MC',
    color: '#ff2d20',
    quote:
      'The GT3 RS handled every corner of Circuit de la Sarthe like it was born there. Velocity delivered exactly what they promised — no compromises.',
    car: 'Porsche 911 GT3 RS',
    rating: 5,
  },
  {
    name: 'Sophia Reyes',
    role: 'Automotive Journalist',
    initials: 'SR',
    color: '#ff6b00',
    quote:
      "In fifteen years of reviewing cars, the NISMO GT-R remains the most visceral machine I've experienced. Every press of the throttle is a religious event.",
    car: 'Nissan GT-R NISMO',
    rating: 5,
  },
  {
    name: 'Julian Hartmann',
    role: 'Track Day Enthusiast',
    initials: 'JH',
    color: '#00d4ff',
    quote:
      "Velocity's service is as extraordinary as their cars. They matched me with the perfect M4 Competition for my driving style, then delivered it to my door.",
    car: 'BMW M4 Competition',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="py-28 px-6 overflow-hidden" style={{ background: '#030508' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow mb-3">Testimonials</div>
          <h2 className="section-title">
            <span className="gradient-text-white">Drivers </span>
            <span className="gradient-text">Speak</span>
          </h2>
        </motion.div>

        {/* Quote card */}
        <div
          className="relative rounded-lg p-10 md:p-14 mb-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Giant quote mark */}
          <div
            className="absolute top-6 left-8 font-orbitron text-[8rem] font-black leading-none select-none"
            style={{ color: 'rgba(255,107,0,0.07)' }}
          >
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#ffd700', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-rajdhani text-xl md:text-2xl leading-relaxed mb-8 relative z-10"
                style={{ color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-orbitron text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg,${t.color},rgba(255,107,0,0.6))` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-orbitron text-sm font-bold text-white">{t.name}</div>
                  <div className="font-orbitron text-[9px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {t.role} — {t.car}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === active ? '2.5rem' : '0.5rem',
                background: i === active ? 'linear-gradient(90deg,#ff2d20,#ff6b00)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
