import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

// Static fallback map
import audiImg from '../assets/AUDI.png';
import bmwImg from '../assets/BMW.png';
import nissanImg from '../assets/NISSAN.png';
import porscheImg from '../assets/PORCHE.png';
import supraImg from '../assets/SUPRA.png';

const STATIC = {
  'audi-rs7-sportback': { _id:'1', brand:'Audi', name:'RS7 Sportback', price:129900, image:audiImg, badge:'Featured', category:'sports', colors:['#c0c0c0','#1a1a1a','#b8860b'], rating:4.9, reviewCount:128, specs:{hp:621,topSpeed:190,acceleration:3.1,engine:'4.0L Biturbo V8',transmission:'8-Spd PDK',drivetrain:'Quattro AWD'}, description:'The Audi RS7 Sportback is a masterpiece of controlled aggression. Its twin-turbocharged V8 engine delivers a breathtaking 621 horsepower, launching from 0–60 in just 3.1 seconds, while the Quattro all-wheel-drive system ensures that every watt of power reaches the road with surgical precision. The adaptive air suspension reads the road 100 times per second, keeping the body flat through corners at speeds that would unsettle lesser machines.' },
  'bmw-m4-competition': { _id:'2', brand:'BMW', name:'M4 Competition', price:84900, image:bmwImg, badge:'Best Seller', category:'sports', colors:['#1a3a6b','#fff','#0d0d0d'], rating:4.8, reviewCount:256, specs:{hp:503,topSpeed:180,acceleration:3.8,engine:'3.0L Biturbo I6',transmission:'8-Spd M DCT',drivetrain:'RWD / xDrive'}, description:"The BMW M4 Competition is the ultimate expression of the M philosophy: maximum performance through minimised weight and maximised power. The S58 engine revs to 7,200 RPM, producing 503 horsepower and 479 lb-ft of torque. The M DCT transmission fires off shifts in under 100 milliseconds, ensuring the power is never interrupted." },
  'nissan-gtr-r35-nismo': { _id:'3', brand:'Nissan', name:'GT-R R35 NISMO', price:212000, image:nissanImg, badge:'Rare', category:'supercar', colors:['#e8e8e8','#cc0000','#1a1a1a'], rating:5.0, reviewCount:89, specs:{hp:600,topSpeed:196,acceleration:2.5,engine:'3.8L Twin-Turbo V6',transmission:'6-Spd Dual-Clutch',drivetrain:'ATTESA AWD'}, description:"Every GT-R NISMO engine is hand-assembled by a single Takumi craftsman at Nissan's engine plant in Yokohama, Japan. The VR38DETT produces 600 horsepower and launches to 60 in 2.5 seconds. Carbon fibre body panels reduce weight while the race-tuned suspension keeps all four wheels in contact with the road at all times." },
  'porsche-911-gt3-rs': { _id:'4', brand:'Porsche', name:'911 GT3 RS', price:243800, image:porscheImg, badge:'Limited', category:'track', colors:['#cc0000','#ff6600','#1a1a1a'], rating:5.0, reviewCount:67, specs:{hp:518,topSpeed:184,acceleration:3.0,engine:'4.0L NA Flat-Six',transmission:'7-Spd PDK',drivetrain:'RWD'}, description:'The 911 GT3 RS is Porsche at its most extreme. Active aerodynamics generate up to 860 kg of downforce at top speed. The 4.0-litre naturally-aspirated flat-six screams to 9,000 RPM, producing 518 horsepower without a single turbocharger in sight. Every element, from the hollow anti-roll bars to the magnesium roof, exists to shave weight.' },
  'toyota-gr-supra-a90': { _id:'5', brand:'Toyota', name:'GR Supra A90', price:58900, image:supraImg, badge:'New', category:'sports', colors:['#ff6600','#cc0000','#ffd700'], rating:4.7, reviewCount:312, specs:{hp:382,topSpeed:155,acceleration:3.9,engine:'3.0L Twin-Scroll I6',transmission:'8-Spd Auto',drivetrain:'RWD'}, description:'The GR Supra A90 resurrects one of the most iconic nameplates in automotive history. The BMW-sourced B58 straight-six engine has been extensively re-engineered by Toyota Gazoo Racing, producing 382 horsepower in a lightweight body with a near-perfect 50/50 weight distribution. Every curve references the iconic A80 generation while pushing performance far beyond.' },
};

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    productsAPI.getOne(slug)
      .then(({ data }) => { setCar(data); setSelectedColor(data.colors?.[0] || ''); })
      .catch(() => {
        const fallback = STATIC[slug];
        if (fallback) { setCar(fallback); setSelectedColor(fallback.colors?.[0] || ''); }
        else navigate('/fleet');
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030508' }}>
        <div className="loader-wheel" />
      </div>
    );
  }

  if (!car) return null;

  const inCart = isInCart(car._id);
  const wishlisted = isWishlisted(car._id);

  const handleAdd = async () => {
    if (inCart) { addToast('Already in garage!'); return; }
    await addItem(car, 1, selectedColor);
    addToast(`${car.name} added to garage 🏎`);
  };

  return (
    <div className="min-h-screen pt-28" style={{ background: '#030508' }}>
      {/* Breadcrumb */}
      <div className="px-8 md:px-12 mb-8">
        <div className="flex items-center gap-2 font-orbitron text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <Link to="/" className="no-underline hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/fleet" className="no-underline hover:text-white/60 transition-colors">Fleet</Link>
          <span>/</span>
          <span style={{ color: '#ff6b00' }}>{car.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image */}
          <motion.div
            className="sticky top-28"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative rounded-lg p-12 flex items-center justify-center"
              style={{
                background: `radial-gradient(ellipse at 50% 60%,${car.colors?.[0] || '#ff6b00'}15,transparent 65%), rgba(255,255,255,0.025)`,
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '420px',
              }}
            >
              <img
                src={car.image}
                alt={car.name}
                className="car-idle w-full object-contain"
                style={{
                  maxHeight: '360px',
                  filter: `drop-shadow(0 20px 80px ${car.colors?.[0] || '#ff6b00'}55)`,
                }}
              />
              {/* Underlight */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-8"
                style={{ background: `radial-gradient(ellipse,${car.colors?.[0] || '#ff6b00'}40,transparent)`, filter: 'blur(12px)' }} />
            </div>

            {/* Thumbnail gallery placeholder */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex-1 h-16 rounded-sm cursor-pointer transition-all duration-200 hover:border-orange-500/40 flex items-center justify-center overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${n === 1 ? 'rgba(255,107,0,0.4)' : 'rgba(255,255,255,0.06)'}` }}
                >
                  <img src={car.image} alt="" className="h-full w-full object-contain opacity-60 hover:opacity-100 transition-opacity p-2" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge + brand */}
            <div className="flex items-center gap-3 mb-3">
              <div className="font-orbitron text-[10px] tracking-[5px] uppercase" style={{ color: '#ff6b00' }}>
                {car.brand}
              </div>
              {car.badge && (
                <span className="px-2.5 py-1 font-orbitron text-[8px] tracking-widest uppercase text-white rounded-sm"
                  style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}>
                  {car.badge}
                </span>
              )}
            </div>

            <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-2">{car.name}</h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400 tracking-wider">{'★'.repeat(Math.round(car.rating || 5))}</span>
              <span className="font-orbitron text-[10px] text-white/30">({car.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="font-orbitron text-4xl font-black mb-8"
              style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ${car.price?.toLocaleString()}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label:'Horsepower', value:`${car.specs?.hp} HP` },
                { label:'0-60 MPH', value:`${car.specs?.acceleration}s` },
                { label:'Top Speed', value:`${car.specs?.topSpeed} MPH` },
                { label:'Engine', value:car.specs?.engine },
                { label:'Transmission', value:car.specs?.transmission },
                { label:'Drivetrain', value:car.specs?.drivetrain },
              ].filter(s => s.value).map(({ label, value }) => (
                <div key={label} className="p-3 rounded-sm text-center"
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div className="font-orbitron text-sm font-bold mb-1" style={{ color:'#ffd700' }}>{value}</div>
                  <div className="font-orbitron text-[8px] tracking-widest uppercase" style={{ color:'rgba(255,255,255,0.3)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="font-rajdhani text-base leading-relaxed mb-8" style={{ color:'rgba(255,255,255,0.5)' }}>
              {car.description}
            </p>

            {/* Color selector */}
            {car.colors?.length > 0 && (
              <div className="mb-8">
                <div className="font-orbitron text-[9px] tracking-[4px] uppercase mb-3" style={{ color:'rgba(255,255,255,0.35)' }}>
                  Color — <span style={{ color:'#ff6b00' }}>{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {car.colors.map(c => (
                    <button key={c}
                      onClick={() => setSelectedColor(c)}
                      className="w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        background: c,
                        border: selectedColor === c ? '3px solid #ff6b00' : '2px solid rgba(255,255,255,0.2)',
                        boxShadow: selectedColor === c ? `0 0 16px ${c}66` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <motion.button
                onClick={handleAdd}
                className="flex-1 py-4 font-orbitron text-xs tracking-[4px] uppercase text-white rounded-sm min-w-[180px]"
                style={{ background: inCart ? 'rgba(255,45,32,0.25)' : 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(255,107,0,0.35)' }}
                whileTap={{ scale: 0.98 }}
              >
                {inCart ? '✓ In Garage' : 'Add to Garage →'}
              </motion.button>

              <motion.button
                onClick={async () => { await toggle(car._id); addToast(wishlisted ? 'Removed from wishlist' : '♥ Added to wishlist'); }}
                className="px-6 py-4 font-orbitron text-xs tracking-[3px] uppercase rounded-sm border transition-all duration-300"
                style={{
                  background: wishlisted ? 'rgba(255,45,32,0.15)' : 'transparent',
                  borderColor: wishlisted ? 'rgba(255,45,32,0.5)' : 'rgba(255,255,255,0.2)',
                  color: wishlisted ? '#ff2d20' : 'rgba(255,255,255,0.6)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {wishlisted ? '♥ Saved' : '♡ Save'}
              </motion.button>
            </div>

            <p className="font-orbitron text-[9px] tracking-widest uppercase mt-4 text-center" style={{ color:'rgba(255,255,255,0.2)' }}>
              Free delivery · 30-day return · Lifetime warranty
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
