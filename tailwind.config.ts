import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
        display: ["'Clash Display'", 'sans-serif'],
        body:    ["'Satoshi'", 'sans-serif'],
      },
      colors: {
        brand: {
          pink:    '#FF5886',
          orange:  '#ff9100',
          orange2: '#ff9d2d',
          green:   '#32C274',
          teal:    '#37C1DB',
          gray:    '#7C7C7C',
          dark:    '#454545',
          mid:     '#5C5C5C',
          light:   '#969696',
        },
        cream:  '#F5F0E8',
        ink:    '#1A1A2E',
        accent: '#FF6B35',
        soft:   '#E8DFD0',
        muted:  '#8B8070',
      },
      keyframes: {
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideFromTop: {
          '0%':   { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideFromBottom: {
          '0%':   { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-up':          'slideUp 0.8s ease forwards',
        'slide-from-top':    'slideFromTop 1.5s ease forwards',
        'slide-from-bottom': 'slideFromBottom 1.5s ease forwards',
        'fade-in':           'fadeIn 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
export default config
