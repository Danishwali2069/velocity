import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../hooks';
import audiImg from '../assets/AUDI.png';

const HERO_CARS = [
  { src: audiImg, label: 'Audi RS7 Sportback' },
];

export default function HeroSection() {
  const parallax = useParallax(24);
  const particlesRef = useRef(null);
  const [glowPulse, setGlowPulse] = useState(false);

  // Generate particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const particles = Array.from({ length: 40 }).map(() => {
      const el = document.createElement('div');
      el.className = 'particle';
      el.style.cssText = [
        `left:${Math.random() * 100}%`,
        `animation-duration:${6 + Math.random() * 12}s`,
        `animation-delay:${Math.random() * 12}s`,
        `opacity:${0.2 + Math.random() * 0.6}`,
        `width:${1 + Math.random() * 3}px`,
        `height:${1 + Math.random() * 3}px`,
      ].join(';');
      container.appendChild(el);
      return el;
    });
    return () => particles.forEach(p => p.remove());
  }, []);

  // Glow pulse interval
  useEffect(() => {
    const id = setInterval(() => setGlowPulse(p => !p), 2000);
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(255,45,32,0.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 30%,rgba(0,212,255,0.04) 0%,transparent 55%),linear-gradient(180deg,#030508 0%,#070c14 50%,#030508 100%)' }} />

      {/* Grid */}
      <div className="hero-grid absolute inset-0" />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-6"
        style={{ transform: `translate(${-parallax.x * 0.3}px,${-parallax.y * 0.3}px)` }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="eyebrow mb-4">
          2026 Premium Collection
        </motion.div>

        <motion.h1 variants={item}
          className="font-orbitron font-black leading-none mb-6"
          style={{ fontSize: 'clamp(3rem,10vw,7.5rem)' }}>
          <span className="block gradient-text-white">BORN TO</span>
          <span className="block gradient-text"
            style={{ filter: 'drop-shadow(0 0 40px rgba(255,107,0,0.4))' }}>
            DOMINATE
          </span>
        </motion.h1>

        <motion.p variants={item}
          className="font-rajdhani text-base md:text-lg tracking-widest mb-10 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)' }}>
          Experience the pinnacle of automotive excellence.<br />
          Where precision engineering meets raw power.
        </motion.p>

        <motion.div variants={item} className="flex gap-5 justify-center flex-wrap">
          <button className="btn-primary"
            onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Explore Fleet</span>
          </button>
          <button className="btn-secondary"
            onClick={() => document.getElementById('race-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Watch Experience
          </button>
        </motion.div>
      </motion.div>

      {/* Car image */}
      <motion.div
        className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transform: `translate(${parallax.x * 0.5}px,${parallax.y * 0.5}px)` }}
      >
        <div className="relative">
          <img
            src={audiImg}
            alt="Audi RS7 Sportback"
            className="car-idle"
            style={{
              width: 'min(75vw,900px)',
              filter: `drop-shadow(0 20px 70px rgba(255,107,0,${glowPulse ? '0.45' : '0.25'})) drop-shadow(0 0 120px rgba(255,45,32,0.1))`,
              transition: 'filter 2s ease-in-out',
            }}
          />
          {/* Neon underlight */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            style={{
              width: '65%',
              height: '30px',
              background: `radial-gradient(ellipse,rgba(255,107,0,${glowPulse ? '0.45' : '0.25'}),transparent 70%)`,
              filter: 'blur(8px)',
              transition: 'all 2s ease-in-out',
            }} />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-10 md:gap-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {[
          { num: '0-60', label: 'in 2.9 sec' },
          { num: '700+', label: 'Horsepower' },
          { num: '220', label: 'MPH Top Speed' },
        ].map(({ num, label }) => (
          <div key={label} className="text-center">
            <div className="font-orbitron text-xl md:text-3xl font-black gradient-text">{num}</div>
            <div className="font-orbitron text-[9px] tracking-[3px] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-1.5 z-10 opacity-40">
        <div className="font-orbitron text-[8px] tracking-[4px] uppercase text-white/50 -rotate-90 translate-y-6 mb-6">Scroll</div>
        <div className="w-px h-14" style={{
          background: 'linear-gradient(to bottom,transparent,#ff6b00)',
          animation: 'pulseGlow 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
