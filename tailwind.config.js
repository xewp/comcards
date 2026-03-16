/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FFFDF7',
          100: '#FFF9ED',
          200: '#FFF3D6',
          300: '#FFEAB8',
          400: '#FFDA8A',
          500: '#F5C96B',
        },
        beige: {
          50:  '#FAF7F2',
          100: '#F5EFE6',
          200: '#EAD9C4',
          300: '#D9BF9E',
          400: '#C6A07A',
          500: '#B08050',
        },
        warm: {
          50:  '#F9F5F0',
          100: '#F0E8D8',
          200: '#DFC9AC',
          300: '#C9A87C',
          400: '#A87D50',
          500: '#7D5A35',
          600: '#5E3F1F',
          700: '#3E280E',
          800: '#2A1A08',
          900: '#160D04',
        },
        rose: {
          blush: '#F2A7B0',
          soft:  '#FDDEE2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card:   '0 8px 32px 0 rgba(160, 120, 80, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)',
        'card-hover': '0 16px 48px 0 rgba(160, 120, 80, 0.28), 0 4px 16px 0 rgba(0,0,0,0.10)',
        glow:   '0 0 24px 4px rgba(245, 201, 107, 0.35)',
        'dark-card': '0 8px 32px 0 rgba(0,0,0,0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(-10px) rotate(1deg)' },
          '66%':       { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float:         'float 5s ease-in-out infinite',
        shimmer:       'shimmer 3s linear infinite',
        'fade-slide-up': 'fadeSlideUp 0.4s ease forwards',
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FAF7F2 0%, #FFF3D6 50%, #F5EFE6 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1c1410 0%, #2a1f14 50%, #1c1410 100%)',
      },
    },
  },
  plugins: [],
}
