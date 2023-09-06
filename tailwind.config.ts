import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--sans-font)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--code-font)', ...defaultTheme.fontFamily.mono],
      source: ['var(--source-font)', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
export default config
