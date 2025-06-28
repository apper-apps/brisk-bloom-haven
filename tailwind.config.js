/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        secondary: '#4CAF50',
        accent: '#FFC107',
        rose: {
          50: '#FFF5F7',
          100: '#FFE4E9',
          500: '#E91E63',
          600: '#C2185B',
          700: '#AD1457'
        },
        green: {
          50: '#F1F8E9',
          100: '#DCEDC1',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bloom': 'bloom 0.6s ease-out',
        'petal-fall': 'petal-fall 8s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        bloom: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}