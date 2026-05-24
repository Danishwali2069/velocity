const ITEMS = [
  '0–60 in 2.9s', '700hp Engine', 'Carbon Fiber Body',
  'Race Grade Brakes', 'Limited Edition', 'Track Certified',
  'AWD System', 'Bespoke Interior', 'Titanium Exhaust',
];

export default function SpeedStrip({ variant = 'orange' }) {
  const doubled = [...ITEMS, ...ITEMS];
  const bg =
    variant === 'dark'
      ? 'rgba(255,255,255,0.04)'
      : 'linear-gradient(135deg,#ff2d20,#ff6b00)';

  return (
    <div className="overflow-hidden py-3" style={{ background: bg }}>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'stripScroll 22s linear infinite' }}
      >
        {doubled.map((text, i) => (
          <span
            key={i}
            className="font-orbitron text-[9px] tracking-[4px] uppercase text-white flex items-center gap-3 flex-shrink-0"
          >
            <span style={{ fontSize: '6px', color: variant === 'dark' ? '#ff6b00' : 'rgba(255,255,255,0.6)' }}>◆</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
