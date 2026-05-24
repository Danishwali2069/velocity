/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'neon-red': '#ff2d20',
        'neon-orange': '#ff6b00',
        'neon-blue': '#00d4ff',
        'neon-gold': '#ffd700',
        'dark': '#030508',
        'dark-2': '#070c14',
        'dark-3': '#0a1120',
        'glass': 'rgba(255,255,255,0.04)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'strip': 'stripScroll 20s linear infinite',
        'grid-move': 'gridMove 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        stripScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        gridMove: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 60px' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
