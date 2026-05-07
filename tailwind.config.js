/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fffdf7',
          100: '#fff7e6',
          200: '#f5edd9',
          300: '#eadfc6',
        },
        ink: {
          900: '#15121c',
          800: '#2b2435',
          700: '#3f334f',
          600: '#5b4b72',
        },
        accent: {
          yellow: '#f6d84b',
          coral: '#ff6b6b',
          teal: '#2db7a3',
          purple: '#7a5cff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        hand: ['Kalam', 'Caveat', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 14px 30px rgba(16, 24, 40, 0.10), 0 2px 6px rgba(16, 24, 40, 0.06)',
        sketch: '0 10px 0 rgba(21, 18, 28, 0.05)',
      },
      keyframes: {
        wiggleSoft: {
          '0%, 100%': { transform: 'rotate(-0.5deg)' },
          '50%': { transform: 'rotate(0.5deg)' },
        },
        drawIn: {
          from: { strokeDashoffset: 'var(--path-len, 220)' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        wiggleSoft: 'wiggleSoft 3.8s ease-in-out infinite',
        drawIn: 'drawIn 700ms ease-out both',
      },
    },
  },
  plugins: [],
}

