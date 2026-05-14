/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef5ff',
          100: '#d9e9ff',
          200: '#bbd5ff',
          300: '#8ab8ff',
          400: '#5290f5',
          500: '#3b6ee8',
          600: '#2550d4',
          700: '#1d3fac',
          800: '#1e378c',
          900: '#1e326f',
          950: '#161f47',
        },
        surface: {
          light: '#f8fafc',
          dark:  '#0f1117',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-light': 'radial-gradient(at 40% 20%, #dbeafe 0px, transparent 50%), radial-gradient(at 80% 0%, #ede9fe 0px, transparent 50%), radial-gradient(at 0% 50%, #dcfce7 0px, transparent 50%)',
        'mesh-dark':  'radial-gradient(at 40% 20%, #1e3a5f 0px, transparent 50%), radial-gradient(at 80% 0%, #2d1b69 0px, transparent 50%), radial-gradient(at 0% 50%, #052e16 0px, transparent 50%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-up':   'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
