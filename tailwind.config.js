/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Mirrors the CSS variables in src/index.css — keep the two in sync.
      colors: {
        blue: '#233877',
        purple: '#9F8EC2',
        bg: '#F5F5F7',
        // Dark surface for the site — the brand blue taken down to near-black
        ink: '#070B1D',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Magistral', 'Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'grad-main': 'linear-gradient(135deg, #233877 0%, #9F8EC2 100%)',
        'grad-reverse': 'linear-gradient(135deg, #9F8EC2 0%, #233877 100%)',
        'grad-vertical': 'linear-gradient(180deg, #233877 0%, #9F8EC2 100%)',
      },
      boxShadow: {
        card: '0 2px 18px rgba(35, 56, 119, 0.07)',
        'card-hover': '0 12px 36px rgba(35, 56, 119, 0.13)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        blink: {
          '0%, 80%, 100%': { opacity: '0.2' },
          '40%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(40px, -30px)' },
          '66%': { transform: 'translate(-30px, 24px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        blink: 'blink 1.4s infinite both',
        gradient: 'gradient-shift 10s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 18s ease-in-out infinite',
        'spin-slow': 'spin 50s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
