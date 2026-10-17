/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8EFFD',
          100: '#D1E0FB',
          200: '#A3C1F7',
          300: '#76A2F3',
          400: '#4883EF',
          500: '#2563EB',
          600: '#1D4FD8',
          700: '#173FAE',
          800: '#122E82',
          900: '#101828',
        },
        accent: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        success: {
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
        neutral: {
          50: '#F5F7FA',
          100: '#EDF1F6',
          200: '#DDE3EB',
          300: '#C4CCD8',
          400: '#9BA5B5',
          500: '#6B7484',
          600: '#4D5666',
          700: '#384050',
          800: '#222B3A',
          900: '#101828',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: 'clamp(4rem, 10vw, 7rem)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 2px 8px rgba(16, 24, 40, 0.06)',
        'card-hover': '0 12px 32px rgba(16, 24, 40, 0.12)',
        hero: '0 20px 60px rgba(16, 24, 40, 0.15)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
