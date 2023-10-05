import typographyPlugin from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--sans-font)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--code-font)', ...defaultTheme.fontFamily.mono],
      source: ['var(--source-font)', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      screens: {
        hidpi: { raw: 'only screen and (min-resolution: 2dppx)' },
      },
    },
  },
  plugins: [typographyPlugin],
}
export default config
