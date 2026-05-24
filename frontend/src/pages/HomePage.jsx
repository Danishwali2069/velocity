import HeroSection from '../components/HeroSection';
import SpeedStrip from '../components/SpeedStrip';
import RaceSection from '../components/RaceSection';
import FeaturedCar from '../components/FeaturedCar';
import FleetSection from '../components/FleetSection';
import StatsBar from '../components/StatsBar';
import TestimonialsSection from '../components/TestimonialsSection';

// Static car data — replace with API data when backend is running
import audiImg from '../assets/AUDI.png';
import bmwImg from '../assets/BMW.png';
import nissanImg from '../assets/NISSAN.png';
import porscheImg from '../assets/PORCHE.png';
import supraImg from '../assets/SUPRA.png';

const STATIC_CARS = [
  {
    _id: '1', brand: 'Audi', name: 'RS7 Sportback', slug: 'audi-rs7-sportback',
    price: 1499, image: audiImg, badge: 'Featured', category: 'sports',
    colors: ['#c0c0c0', '#1a1a1a', '#b8860b'], rating: 0, reviewCount: 0,
    specs: { hp: 621, topSpeed: 190, acceleration: 3.1, engine: '4.0L Biturbo V8', transmission: '8-Spd PDK', drivetrain: 'Quattro AWD' },
    description: 'The Audi RS7 Sportback fuses breathtaking design with electrifying performance. Its twin-turbocharged V8 delivers 621 horsepower, launching you to 60 in just 3.1 seconds.',
    createdAt: new Date('2026-01-01'),
  },
  {
    _id: '2', brand: 'BMW', name: 'M4 Competition', slug: 'bmw-m4-competition',
    price: 1499, image: bmwImg, badge: 'Best Seller', category: 'sports',
    colors: ['#1a3a6b', '#fff', '#0d0d0d'], rating: 0, reviewCount: 0,
    specs: { hp: 503, topSpeed: 180, acceleration: 3.8, engine: '3.0L Biturbo I6', transmission: '8-Spd M DCT', drivetrain: 'RWD / xDrive' },
    description: 'The BMW M4 Competition is the pinnacle of precision engineering. Race-tuned S58 twin-turbo inline-6 with competition-grade chassis.',
    createdAt: new Date('2026-01-15'),
  },
  {
    _id: '3', brand: 'Nissan', name: 'GT-R R35 NISMO', slug: 'nissan-gtr-r35-nismo',
    price: 2199, image: nissanImg, badge: 'Rare', category: 'supercar',
    colors: ['#e8e8e8', '#cc0000', '#1a1a1a'], rating: 0, reviewCount: 0,
    specs: { hp: 600, topSpeed: 196, acceleration: 2.5, engine: '3.8L Twin-Turbo V6', transmission: '6-Spd Dual-Clutch', drivetrain: 'ATTESA AWD' },
    description: 'Godzilla reborn. Hand-assembled VR38DETT engine, carbon fiber panels, and race-tuned aero make this the ultimate Japanese supercar.',
    createdAt: new Date('2026-02-01'),
  },
  {
    _id: '4', brand: 'Porsche', name: '911 GT3 RS', slug: 'porsche-911-gt3-rs',
    price: 2199, image: porscheImg, badge: 'Limited', category: 'track',
    colors: ['#cc0000', '#ff6600', '#1a1a1a'], rating: 0, reviewCount: 0,
    specs: { hp: 518, topSpeed: 184, acceleration: 3.0, engine: '4.0L NA Flat-Six', transmission: '7-Spd PDK', drivetrain: 'RWD' },
    description: 'The most extreme naturally-aspirated 911 ever built. Active aero, 9,000 RPM flat-six, absolute track supremacy.',
    createdAt: new Date('2026-02-10'),
  },
  {
    _id: '5', brand: 'Toyota', name: 'GR Supra A90', slug: 'toyota-gr-supra-a90',
    price: 1499, image: supraImg, badge: 'New', category: 'sports',
    colors: ['#ff6600', '#cc0000', '#ffd700'], rating: 0, reviewCount: 0,
    specs: { hp: 382, topSpeed: 155, acceleration: 3.9, engine: '3.0L Twin-Scroll I6', transmission: '8-Spd Auto', drivetrain: 'RWD' },
    description: 'The reborn legend. BMW-developed B58 straight-six, near-perfect weight distribution, iconic long-hood silhouette.',
    createdAt: new Date('2026-03-01'),
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SpeedStrip />
      <RaceSection />
      <div className="neon-divider" />
      <FeaturedCar />
      <div className="neon-divider" />
      <FleetSection cars={STATIC_CARS} loading={false} />
      <StatsBar />
      <TestimonialsSection />
    </>
  );
}
