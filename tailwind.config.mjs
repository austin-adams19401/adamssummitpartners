import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1E3B',
          50: '#E6EAF1',
          100: '#C2CAD9',
          500: '#0B1E3B',
          700: '#081630',
          900: '#050E20',
        },
        gold: {
          DEFAULT: '#C9A961',
          100: '#F4EBD3',
          300: '#E0C98A',
          500: '#C9A961',
          700: '#A48742',
          900: '#6E5A2C',
        },
        cream: '#FAF8F3',
        charcoal: '#1F2937',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      maxWidth: {
        prose: '65ch',
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.2em',
      },
    },
  },
  plugins: [typography],
};
