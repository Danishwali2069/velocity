import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Import all car images
import audiImg from '../assets/AUDI.png';
import bmwImg from '../assets/BMW.png';
import nissanImg from '../assets/NISSAN.png';
import porscheImg from '../assets/PORCHE.png';
import supraImg from '../assets/SUPRA.png';

const FEATURED = [
  {
    id: 'audi-rs7',
    brand: 'Audi',
    name: 'RS7 Sportback',
    tagline: 'Elegance With Fangs',
    price: 129900,
    image: audiImg,
    color: '#c0c0c0',
    accent: '#ff6b00',
    specs: [
      { label: 'Engine', value: '4.0L Biturbo V8' },
      { label: 'Output', value: '621 HP' },
      { label: '0–60', value: '3.1 sec' },
      { label: 'Top Speed', value: '190 MPH' },
    ],
  },
  {
    id: 'bmw-m4',
    brand: 'BMW',
    name: 'M4 Competition',
    tagline: 'Pure Driving Pleasure',
    price: 84900,
    image: bmwImg,
    color: '#1a3a6b',
    accent: '#00d4ff',
    specs: [
      { label: 'Engine', value: '3.0L Biturbo I6' },
      { label: 'Output', value: '503 HP' },
      { label: '0–60', value: '3.8 sec' },
      { label: 'Top Speed', value: '180 MPH' },
    ],
  },
  {
    id: 'nissan-gtr',
    brand: 'Nissan',
    name: 'GT-R R35 NISMO',
    tagline: 'Godzilla Reborn',
    price: 212000,
    image: nissanImg,
    color: '#e8e8e8',
    accent: '#ff2d20',
    specs: [
      { label: 'Engine', value: '3.8L Twin-Turbo V6' },
      { label: 'Output', value: '600 HP' },
      { label: '0–60', value: '2.5 sec' },
      { label: 'Top Speed', value: '196 MPH' },
    ],
  },
  {
    id: 'porsche-gt3',
    brand: 'Porsche',
    name: '911 GT3 RS',
    tagline: 'Track Born. Street Legal.',
    price: 243800,
    image: porscheImg,
    color: '#cc0000',
    accent: '#ff6b00',
    specs: [
      { label: 'Engine', value: '4.0L Flat-Six NA' },
      { label: 'Output', value: '518 HP' },
      { label: '0–60', value: '3.0 sec' },
      { label: 'Top Speed', value: '184 MPH' },
    ],
  },
  {
    id: 'supra-a90',
    brand: 'Toyota',
    name: 'GR Supra A90',
    tagline: 'The Legend Returns',
    price: 58900,
    image: supraImg,
    color: '#ff6600',
    accent: '#ffd700',
    specs: [
      { label: 'Engine', value: '3.0L Twin-Scroll I6' },
      { label: 'Output', value: '382 HP' },
      { label: '0–60', value: '3.9 sec' },
      { label: 'Top Speed', value: '155 MPH' },
    ],
  },
];

export default function FeaturedCar() {
  const [active, setActive] = useState(0);
  const { addItem, isInCart } = useCart();
  const { addToast } = useToast();
  const car = FEATURED[active];

  const handleAdd = async () => {
    if (isInCart(car.id)) { addToast('Already in your garage!'); return; }
    // Build minimal product object for local cart
    await addItem({ _id: car.id, brand: car.brand, name: car.name, price: car.price, image: car.image });
    addToast(`${car.name} added to garage 🏎`);
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#030508' }}
    >
      {/* Background glow that shifts per car */}
      <AnimatePresence mode="wait">
        <motion.div
          key={car.id + '-bg'}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse at 60% 50%, ${car.color}12 0%, transparent 65%),
                         radial-gradient(ellipse at 20% 80%, ${car.accent}0a 0%, transparent 50%)`,
          }}
        />
      </AnimatePresence>

      {/* Grid */}
      <div className="hero-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="eyebrow mb-3">Featured Model</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="font-orbitron text-sm tracking-[4px] uppercase mb-2"
                    style={{ color: car.accent }}
                  >
                    {car.brand}
                  </div>
                  <h2
                    className="font-orbitron font-black leading-none mb-2"
                    style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: '#fff' }}
                  >
                    {car.name}
                  </h2>
                  <div
                    className="font-rajdhani text-xl italic mb-8"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {car.tagline}
                  </div>

                  {/* Spec list */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {car.specs.map(({ label, value }) => (
                      <div
                        key={label}
                        className="p-4 rounded-sm"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="font-orbitron text-base font-bold mb-1"
                          style={{ color: car.accent }}
                        >
                          {value}
                        </div>
                        <div
                          className="font-orbitron text-[9px] tracking-widest uppercase"
                          style={{ color: 'rgba(255,255,255,0.35)' }}
                        >
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div
                      className="font-orbitron text-3xl font-black"
                      style={{
                        background: `linear-gradient(135deg,#ff2d20,${car.accent})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ${car.price.toLocaleString()}
                    </div>
                    <motion.button
                      onClick={handleAdd}
                      className="btn-primary"
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>{isInCart(car.id) ? '✓ In Garage' : 'Add to Garage →'}</span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right — car image */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={car.id + '-img'}
                className="relative"
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -40 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="car-idle"
                  style={{
                    width: 'min(55vw,560px)',
                    filter: `drop-shadow(0 20px 60px ${car.accent}55) drop-shadow(0 0 100px ${car.color}22)`,
                  }}
                />
                {/* Underlight */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                  style={{
                    width: '70%',
                    height: '40px',
                    background: `radial-gradient(ellipse, ${car.accent}55, transparent 70%)`,
                    filter: 'blur(10px)',
                    animation: 'pulseGlow 3s ease-in-out infinite',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Car selector tabs */}
        <div className="flex gap-3 mt-16 flex-wrap justify-center">
          {FEATURED.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 font-orbitron text-[9px] tracking-[3px] uppercase rounded-sm border transition-all duration-400"
              style={{
                background: i === active ? `linear-gradient(135deg,#ff2d20,${f.accent})` : 'transparent',
                borderColor: i === active ? 'transparent' : 'rgba(255,255,255,0.1)',
                color: i === active ? '#fff' : 'rgba(255,255,255,0.35)',
                transform: i === active ? 'translateY(-2px)' : 'none',
                boxShadow: i === active ? `0 8px 24px ${f.accent}33` : 'none',
              }}
            >
              {f.brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
