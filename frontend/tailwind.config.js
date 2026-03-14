import type { Config } from 'tailwindcss'

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#A78BFA',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          glow: '#00FFFF',
        },
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          surface: '#1f1f1f',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3s steps(40, end), blink-caret .75s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #A78BFA'
          },
          '100%': { 
            boxShadow: '0 0 20px #A78BFA, 0 0 30px #A78BFA'
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translate3d(0,0,0)'
          },
          '50%': { 
            transform: 'translate3d(10px, -10px, 0)'
          },
        },
        typing: {
          'from': { 
            width: '0%' 
          },
          'to': { 
            width: '100%' 
          }
        },
        'blink-caret': {
          'from, to': { 
            borderColor: 'transparent' 
          },
          '50%': { 
            borderColor: '#A78BFA' 
          },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} satisfies Config

export default config

