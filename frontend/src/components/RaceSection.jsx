import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks';
import supraImg from '../assets/SUPRA.png';

const PHASES = [
  {
    label: 'CITY SPRINT',
    speed: '186',
    unit: 'KM/H',
    desc: 'Precision engineered for urban domination. Every curve carved from raw ambition and silicon.',
    envClass: 'env-city',
    carPos: '8%',
    roadSpeed: '0.4s',
  },
  {
    label: 'RACE TRACK',
    speed: '298',
    unit: 'KM/H',
    desc: 'Unleashed on the circuit. Pure mechanical symphony at 9,000 RPM screaming down the straight.',
    envClass: 'env-track',
    carPos: '30%',
    roadSpeed: '0.22s',
  },
  {
    label: 'NEON TUNNEL',
    speed: '342',
    unit: 'KM/H',
    desc: 'Transcending reality. Where speed becomes art and the laws of physics yield to pure will.',
    envClass: 'env-neon',
    carPos: '52%',
    roadSpeed: '0.12s',
  },
];

export default function RaceSection() {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const phaseIndex = Math.min(PHASES.length - 1, Math.floor(progress * PHASES.length));
  const phase = PHASES[phaseIndex];

  // Road line animation speed
  const roadLinesRef = useRef(null);
  useEffect(() => {
    const lines = roadLinesRef.current?.querySelectorAll('.road-line');
    lines?.forEach(l => { l.style.animationDuration = phase.roadSpeed; });
  }, [phase.roadSpeed]);

  return (
    <section
      id="race-section"
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center"
    >
      {/* Background environment — cross-fades */}
      {PHASES.map((p, i) => (
        <div
          key={p.label}
          className={`absolute inset-0 transition-opacity duration-700 ${p.envClass}`}
          style={{ opacity: i === phaseIndex ? 1 : 0 }}
        />
      ))}

      {/* Road */}
      <div className="absolute bottom-0 inset-x-0 h-28">
        {/* Asphalt */}
        <div className="absolute inset-x-0 bottom-0 h-20 opacity-30"
          style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }} />
        {/* Lines */}
        <div ref={roadLinesRef}
          className="absolute bottom-10 inset-x-0 h-1 flex gap-10 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="road-line" />
          ))}
        </div>
      </div>

      {/* Car */}
      <motion.div
        className="absolute bottom-24"
        animate={{ left: phase.carPos }}
        transition={{ type: 'spring', damping: 30, stiffness: 180 }}
      >
        {/* Motion blur trails */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 flex gap-2 pr-4">
          {[1, 0.6, 0.3].map((o, i) => (
            <div key={i} className="h-12 w-16 rounded-full"
              style={{
                background: `radial-gradient(ellipse at right,rgba(255,107,0,${o * 0.3}),transparent)`,
                filter: 'blur(12px)',
                transform: `scaleX(${1 + i * 0.5})`,
              }} />
          ))}
        </div>

        <img
          src={supraImg}
          alt="Racing car"
          style={{
            width: 'min(42vw,420px)',
            filter: `drop-shadow(0 8px 30px rgba(255,107,0,0.5)) drop-shadow(-8px 0 20px rgba(255,107,0,0.2))`,
          }}
        />

        {/* Neon underlight */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4"
          style={{ background: 'radial-gradient(ellipse,rgba(255,107,0,0.5),transparent)', filter: 'blur(6px)' }} />
      </motion.div>

      {/* Content panel */}
      <motion.div
        key={phase.label}
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-right max-w-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="eyebrow mb-3">{phase.label}</div>
        <div className="font-orbitron font-black gradient-text" style={{ fontSize: 'clamp(4rem,9vw,7rem)', lineHeight: 1 }}>
          {phase.speed}
        </div>
        <div className="font-orbitron text-xl tracking-[5px] mt-1 mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {phase.unit}
        </div>
        <p className="font-rajdhani text-base leading-relaxed tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {phase.desc}
        </p>

        {/* Phase dots */}
        <div className="flex gap-2 mt-6 justify-end">
          {PHASES.map((_, i) => (
            <div key={i} className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === phaseIndex ? '2rem' : '0.5rem',
                background: i === phaseIndex ? 'linear-gradient(90deg,#ff2d20,#ff6b00)' : 'rgba(255,255,255,0.2)',
              }} />
          ))}
        </div>
      </motion.div>

      {/* Speed strip at top */}
      <div className="absolute top-0 inset-x-0 speed-strip">
        <div className="flex gap-12 animate-strip whitespace-nowrap">
          {['0-60 in 2.9s', '700hp Engine', 'Carbon Fiber', 'Race Certified', 'Track Edition', 'Limited Run',
            '0-60 in 2.9s', '700hp Engine', 'Carbon Fiber', 'Race Certified', 'Track Edition', 'Limited Run',
          ].map((text, i) => (
            <span key={i} className="font-orbitron text-[9px] tracking-[4px] uppercase text-white flex items-center gap-3">
              <span style={{ fontSize: '6px' }}>◆</span>{text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
