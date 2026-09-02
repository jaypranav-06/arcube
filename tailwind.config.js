/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0f1714',
          900: '#141e1a',
          DEFAULT: '#192420',
          800: '#192420', // Primary background requested: #192420
          700: '#23322d',
          600: '#2f423c',
          500: '#3e564e',
        },
        gold: {
          light: '#dfc4a6',
          DEFAULT: '#D0AE89', // Accent / highlight color requested: #D0AE89
          hover: '#c49e75',
          dark: '#b2895e',
        },
        cream: {
          light: '#ffffff',
          DEFAULT: '#F5F0E8', // Supporting neutral requested: #F5F0E8
          muted: '#cfc8bc',
          dark: '#9a9386',
        },
        // Backwards compatibility for existing component classes
        obsidian: {
          950: '#0f1714',
          900: '#192420',
          800: '#23322d',
          700: '#2f423c',
        },
        champagne: {
          100: '#F5F0E8',
          200: '#e6d3bd',
          300: '#dfc4a6',
          400: '#D0AE89',
          500: '#c49e75',
          600: '#b2895e',
        },
        travertine: {
          100: '#F5F0E8',
          200: '#eae4d9',
          300: '#cfc8bc',
          400: '#a8a092',
          500: '#878072',
        }
      },
      fontFamily: {
        sans: ["'Jost'", "'Poppins'", "'Century Gothic'", "sans-serif"],
        display: ["'Jost'", "'Poppins'", "'Century Gothic'", "sans-serif"],
        serif: ["'Jost'", "'Poppins'", "'Century Gothic'", "sans-serif"],
        cinzel: ["'Jost'", "'Poppins'", "'Century Gothic'", "sans-serif"],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
        epic: '.35em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
