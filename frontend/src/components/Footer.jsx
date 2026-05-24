import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cols = [
  {
    heading: 'Fleet',
    links: [
      { label: 'Sports Cars', to: '/fleet?category=sports' },
      { label: 'Supercars', to: '/fleet?category=supercar' },
      { label: 'Track Edition', to: '/fleet?category=track' },
      { label: 'Limited Runs', to: '/fleet?category=limited' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '#' },
      { label: 'Press', to: '#' },
      { label: 'Events', to: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact', to: '#' },
      { label: 'FAQ', to: '#' },
      { label: 'Warranty', to: '#' },
      { label: 'Service', to: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: '#070c14', borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="font-orbitron text-2xl font-black tracking-[5px] mb-4"
              style={{
                background: 'linear-gradient(135deg,#ff2d20,#ff6b00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VELOCITY
            </div>
            <p className="font-rajdhani text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Where performance meets passion. Every model crafted for those who refuse to compromise.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {['𝕏', 'in', 'yt', 'ig'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-sm border flex items-center justify-center font-orbitron text-xs transition-all duration-300"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#ff6b00';
                    e.currentTarget.style.color = '#ff6b00';
                    e.currentTarget.style.background = 'rgba(255,107,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {cols.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              <h4 className="font-orbitron text-[9px] tracking-[5px] uppercase mb-5"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="font-rajdhani text-sm no-underline transition-colors duration-300 relative group"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,107,0,0.9)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter bar */}
        <motion.div
          className="mt-16 p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,107,0,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <div className="font-orbitron text-sm font-bold text-white tracking-widest mb-1">Stay in the Race</div>
            <div className="font-rajdhani text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Get exclusive drops, event invites, and track updates.
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="form-input flex-1 md:w-56 text-sm"
            />
            <button
              className="px-6 py-3 font-orbitron text-[10px] tracking-[3px] uppercase text-white rounded-sm whitespace-nowrap transition-all duration-300"
              style={{ background: 'linear-gradient(135deg,#ff2d20,#ff6b00)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.35)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="font-rajdhani text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2026 Velocity Racing. All rights reserved.
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#"
                className="font-orbitron text-[9px] tracking-widest uppercase no-underline transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff6b00'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="font-orbitron text-[9px] tracking-[4px] uppercase" style={{ color: '#ff6b00' }}>
            Born To Dominate
          </div>
        </div>
      </div>
    </footer>
  );
}
