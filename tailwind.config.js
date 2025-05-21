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
        // WSmartBuy color scheme
        wsmartbuy: {
          bg: '#0D0D0D',
          primary: '#FF3CAC',
          secondary: '#784BA0',
          highlight: '#2B86C5',
          text: '#EAEAEA',
          dark: '#0A0A0A',
          'text-muted': 'rgba(234, 234, 234, 0.7)'
        },
        glacier: {
          50: '#F0FBFF',
          100: '#E0F7FF',
          200: '#BAEEFF',
          300: '#94E5FF',
          400: '#5ED4FC',
          500: '#38BEF8',
          600: '#0E9AD4',
        },
        coral: {
          50: '#FFF5F5',
          100: '#FFE9E9',
          200: '#FFD1D1',
          300: '#FFB3B3',
          400: '#FF8080',
          500: '#FF4D4D',
          600: '#E02020',
        },
        mint: {
          50: '#EDFCF6',
          100: '#D3F8E9',
          200: '#A8F0D3',
          300: '#72E5B9',
          400: '#3DD598',
          500: '#22B573',
          600: '#178F58',
        },
        sand: {
          50: '#FEFAF4',
          100: '#FDF6E9',
          200: '#FBEAC7',
          300: '#F7D99F',
          400: '#F1BF65',
          500: '#EDAB38',
          600: '#D18A14',
        },
        slate: {
          50: '#F7F9FC',
          100: '#EEF2F9',
          200: '#DADDEB',
          300: '#BBC3D9',
          400: '#8490BC',
          500: '#5F6B98',
          600: '#414976',
          700: '#2E355A',
          800: '#1F243D',
          900: '#131629',
        },
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(135deg, rgba(30, 41, 59, 0.2), rgba(15, 23, 42, 0.05))',
        'gradient-vibrant': 'linear-gradient(90deg, #38BEF8, #3DD598)',
        'gradient-warm': 'linear-gradient(90deg, #EDAB38, #FF4D4D)',
        'gradient-cool': 'linear-gradient(135deg, #0F172A, #1E293B)',
        // WSmartBuy specific gradients
        'wsmartbuy-primary': 'linear-gradient(90deg, #FF3CAC, #784BA0)',
        'wsmartbuy-secondary': 'linear-gradient(90deg, #784BA0, #2B86C5)',
        'wsmartbuy-highlight': 'linear-gradient(90deg, #2B86C5, #FF3CAC)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'text-shimmer': 'text-shimmer 2.5s ease infinite',
        'morph': 'morph 8s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'slide-right': 'slide-right 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 0px rgba(56, 190, 248, 0.3)' },
          '50%': { boxShadow: '0 0 40px 10px rgba(56, 190, 248, 0.5)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}