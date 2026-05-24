import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDebounce } from '../hooks';
import { productsAPI } from '../utils/api';
import FleetSection from '../components/FleetSection';
import SpeedStrip from '../components/SpeedStrip';

// Fallback static data (used if API is unreachable)
import audiImg from '../assets/AUDI.png';
import bmwImg from '../assets/BMW.png';
import nissanImg from '../assets/NISSAN.png';
import porscheImg from '../assets/PORCHE.png';
import supraImg from '../assets/SUPRA.png';

const FALLBACK = [
  { _id:'1', brand:'Audi', name:'RS7 Sportback', slug:'audi-rs7-sportback', price:129900, image:audiImg, badge:'Featured', category:'sports', colors:['#c0c0c0','#1a1a1a','#b8860b'], rating:4.9, reviewCount:128, specs:{hp:621,topSpeed:190,acceleration:3.1,engine:'4.0L Biturbo V8',transmission:'8-Spd PDK',drivetrain:'Quattro AWD'}, description:'The Audi RS7 Sportback fuses breathtaking design with electrifying performance.', createdAt:new Date('2026-01-01') },
  { _id:'2', brand:'BMW', name:'M4 Competition', slug:'bmw-m4-competition', price:84900, image:bmwImg, badge:'Best Seller', category:'sports', colors:['#1a3a6b','#fff','#0d0d0d'], rating:4.8, reviewCount:256, specs:{hp:503,topSpeed:180,acceleration:3.8,engine:'3.0L Biturbo I6',transmission:'8-Spd M DCT',drivetrain:'RWD'}, description:'The BMW M4 Competition transforms every road into a racetrack.', createdAt:new Date('2026-01-15') },
  { _id:'3', brand:'Nissan', name:'GT-R R35 NISMO', slug:'nissan-gtr-r35-nismo', price:212000, image:nissanImg, badge:'Rare', category:'supercar', colors:['#e8e8e8','#cc0000','#1a1a1a'], rating:5.0, reviewCount:89, specs:{hp:600,topSpeed:196,acceleration:2.5,engine:'3.8L Twin-Turbo V6',transmission:'6-Spd Dual-Clutch',drivetrain:'ATTESA AWD'}, description:'Godzilla reborn. Hand-assembled VR38DETT engine.', createdAt:new Date('2026-02-01') },
  { _id:'4', brand:'Porsche', name:'911 GT3 RS', slug:'porsche-911-gt3-rs', price:243800, image:porscheImg, badge:'Limited', category:'track', colors:['#cc0000','#ff6600','#1a1a1a'], rating:5.0, reviewCount:67, specs:{hp:518,topSpeed:184,acceleration:3.0,engine:'4.0L NA Flat-Six',transmission:'7-Spd PDK',drivetrain:'RWD'}, description:'The most extreme naturally-aspirated 911 ever built.', createdAt:new Date('2026-02-10') },
  { _id:'5', brand:'Toyota', name:'GR Supra A90', slug:'toyota-gr-supra-a90', price:58900, image:supraImg, badge:'New', category:'sports', colors:['#ff6600','#cc0000','#ffd700'], rating:4.7, reviewCount:312, specs:{hp:382,topSpeed:155,acceleration:3.9,engine:'3.0L Twin-Scroll I6',transmission:'8-Spd Auto',drivetrain:'RWD'}, description:'The reborn legend.', createdAt:new Date('2026-03-01') },
];

export default function FleetPage() {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState(FALLBACK);
  const [loading, setLoading] = useState(false);

  // Try to fetch from API, fall back to static
  useEffect(() => {
    setLoading(true);
    productsAPI.getAll({ limit: 20 })
      .then(({ data }) => { if (data.products?.length) setCars(data.products); })
      .catch(() => setCars(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Page hero */}
      <div
        className="relative pt-36 pb-16 px-8 text-center overflow-hidden"
        style={{ background: '#030508' }}
      >
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(255,107,0,0.06),transparent 60%)' }}
        />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-3">2026 Collection</div>
          <h1
            className="font-orbitron font-black leading-none mb-4"
            style={{ fontSize: 'clamp(3rem,8vw,5rem)' }}
          >
            <span className="gradient-text-white">The </span>
            <span className="gradient-text">Full Fleet</span>
          </h1>
          <p className="font-rajdhani text-base tracking-wider max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Every machine in our collection. Sorted, filtered, and ready to dominate.
          </p>
        </motion.div>
      </div>

      <SpeedStrip variant="dark" />

      <FleetSection cars={cars} loading={loading} />
    </>
  );
}
