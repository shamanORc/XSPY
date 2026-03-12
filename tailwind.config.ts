import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0A0A0F',
        surface: '#111118',
        card:    '#16161F',
        border:  '#1E1E2E',
        muted:   '#2A2A3E',
        xtext:   '#E8E8F0',
        sub:     '#7070A0',
        gold:    '#C9A84C',
        'gold-lt':'#F5E9C8',
        accent:  '#6366F1',
      },
    },
  },
  plugins: [],
}
export default config
