import { useState } from 'react';
import { motion } from 'framer-motion';
import CarCard from './CarCard';
import CarModal from './CarModal';

const FILTERS = ['All', 'Sports', 'Supercar', 'Track', 'Limited'];
const SORTS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price ↑', value: 'price_asc' },
  { label: 'Price ↓', value: 'price_desc' },
];

export default function FleetSection({ cars = [], loading = false }) {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  const filtered = cars
    .filter(c => {
      if (filter !== 'All' && c.category?.toLowerCase() !== filter.toLowerCase()) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) &&
          !c.brand.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  return (
    <section id="fleet" className="py-28 px-6 md:px-12" style={{ background: '#070c14' }}>
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="eyebrow mb-3">2026 Collection</div>
        <h2 className="section-title">
          <span className="gradient-text-white">Choose Your </span>
          <span className="gradient-text">Machine</span>
        </h2>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search cars..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-9 text-sm w-full"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">⌕</span>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap justify-center">
          {FILTERS.map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 font-orbitron text-[9px] tracking-widest uppercase rounded-sm border transition-all duration-300"
              style={{
                background: filter === f ? 'linear-gradient(135deg,#ff2d20,#ff6b00)' : 'transparent',
                borderColor: filter === f ? 'transparent' : 'rgba(255,255,255,0.12)',
                color: filter === f ? '#fff' : 'rgba(255,255,255,0.45)',
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="form-input text-sm w-full md:w-40 text-white/70"
          style={{ appearance: 'none', cursor: 'pointer' }}
        >
          {SORTS.map(s => <option key={s.value} value={s.value} style={{ background: '#070c14' }}>{s.label}</option>)}
        </select>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loader-wheel" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-orbitron text-xs tracking-[5px] uppercase text-white/25">No cars found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <CarCard
                key={car._id || car.id}
                car={car}
                delay={i * 0.08}
                onOpenModal={setSelectedCar}
              />
            ))}
          </div>
        )}
      </div>

      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  );
}
