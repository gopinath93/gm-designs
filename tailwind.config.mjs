/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
        },
        body: {
          DEFAULT: '#334155',
          dark: '#1E293B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F8FAFC',
          subtle: '#F1F5F9',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#CBD5E1',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          soft: '#EFF6FF',
          muted: '#DBEAFE',
          subtle: '#F0F7FF',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans Tamil',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1120px',
        prose: '70ch',
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.55' }], // Refined 16px default for clean readability
        'base-desktop': ['1rem', { lineHeight: '1.55' }],
      },
      minHeight: {
        tap: '44px',
      },
      minWidth: {
        tap: '44px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        elevated: '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
    },
  },
  plugins: [],
};
