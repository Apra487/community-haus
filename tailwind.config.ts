import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: '#fff',
        dark: '#000',
      },
      secondary: 'rgba(255, 255, 255, 0.60)',
      accent: '#8EFF01',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        md: '1.5rem',
      },
    },
    extend: {
      backgroundImage: {
        creator: 'url("/assets/bgs/creator.svg")',
        collector: 'url("/assets/bgs/collector.svg")',
      },
    },
  },
  plugins: [],
};
export default config;
