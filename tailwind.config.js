/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Icons',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        display: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      },
      fontSize: {
        'heading-xl': ['44px', { lineHeight: '48px', letterSpacing: '-0.003em', fontWeight: '700' }],
        'heading-l': ['40px', { lineHeight: '44px', letterSpacing: '-0.003em', fontWeight: '700' }],
        'heading-m': ['32px', { lineHeight: '36px', letterSpacing: '-0.002em', fontWeight: '700' }],
        'heading-s': ['24px', { lineHeight: '28px', letterSpacing: '-0.001em', fontWeight: '600' }],
        'body-l': ['17px', { lineHeight: '25px', letterSpacing: '-0.022em' }],
        'body-m': ['14px', { lineHeight: '20px', letterSpacing: '-0.016em' }],
        'body-s': ['12px', { lineHeight: '16px', letterSpacing: '-0.01em' }]
      }
    }
  },
  plugins: []
};