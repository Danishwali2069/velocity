require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const cars = [
  {
    brand: 'Audi', name: 'RS7 Sportback', slug: 'audi-rs7-sportback',
    price: 1499, image: '/images/AUDI.png', badge: 'Featured',
    colors: ['#c0c0c0', '#1a1a1a', '#b8860b'], featured: true, category: 'sports',
    specs: { hp: 621, topSpeed: 190, acceleration: 3.1, engine: '4.0L Twin-Turbo V8', transmission: '8-Speed PDK', drivetrain: 'Quattro AWD' },
    description: 'The Audi RS7 Sportback fuses breathtaking design with electrifying performance. Twin-turbocharged V8 engine delivers 621hp, launching 0–60 in 3.1 seconds.',
    stock: 5, rating: 0, reviewCount: 0,
  },
  {
    brand: 'BMW', name: 'M4 Competition', slug: 'bmw-m4-competition',
    price: 1499, image: '/images/BMW.png', badge: 'Best Seller',
    colors: ['#1a3a6b', '#ffffff', '#0d0d0d'], featured: true, category: 'sports',
    specs: { hp: 503, topSpeed: 180, acceleration: 3.8, engine: '3.0L Twin-Turbo I6', transmission: '8-Speed M DCT', drivetrain: 'RWD / xDrive' },
    description: 'The BMW M4 Competition transforms every road into a racetrack. S58 twin-turbo inline-6 with competition-grade chassis tuning.',
    stock: 8, rating: 0, reviewCount: 0,
  },
  {
    brand: 'Nissan', name: 'GT-R R35 NISMO', slug: 'nissan-gtr-r35-nismo',
    price: 2199, image: '/images/NISSAN.png', badge: 'Rare',
    colors: ['#e8e8e8', '#cc0000', '#1a1a1a'], featured: true, category: 'supercar',
    specs: { hp: 600, topSpeed: 196, acceleration: 2.5, engine: '3.8L Twin-Turbo V6', transmission: '6-Speed Dual-Clutch', drivetrain: 'ATTESA E-TS AWD' },
    description: 'Godzilla reborn. Hand-assembled VR38DETT twin-turbo engine, carbon fiber body panels, race-tuned aerodynamics.',
    stock: 3, rating: 0, reviewCount: 0,
  },
  {
    brand: 'Porsche', name: '911 GT3 RS', slug: 'porsche-911-gt3-rs',
    price: 2199, image: '/images/PORCHE.png', badge: 'Limited',
    colors: ['#cc0000', '#ff6600', '#1a1a1a'], featured: true, category: 'track',
    specs: { hp: 518, topSpeed: 184, acceleration: 3.0, engine: '4.0L Naturally Aspirated Flat-6', transmission: '7-Speed PDK', drivetrain: 'RWD' },
    description: 'The most extreme naturally-aspirated 911 ever built. Active aerodynamics, 9,000 RPM flat-six, PDK gearbox.',
    stock: 2, rating: 0, reviewCount: 0,
  },
  {
    brand: 'Toyota', name: 'GR Supra A90', slug: 'toyota-gr-supra-a90',
    price: 1499, image: '/images/SUPRA.png', badge: 'New',
    colors: ['#ff6600', '#cc0000', '#ffd700'], featured: false, category: 'sports',
    specs: { hp: 382, topSpeed: 155, acceleration: 3.9, engine: '3.0L Twin-Scroll Turbo I6', transmission: '8-Speed Auto', drivetrain: 'RWD' },
    description: 'The reborn legend. BMW-co-developed B58 straight-six, near-perfect weight distribution, iconic long-hood silhouette.',
    stock: 12, rating: 0, reviewCount: 0,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(cars);
  console.log('✅ Database seeded with', cars.length, 'cars');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
