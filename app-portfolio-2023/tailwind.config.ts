import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-pretendard)',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          'sans-serif',
        ],
        head: ['var(--font-hammersmith-one)', 'var(--font-tungkeun)'],
      },
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dot-underline-black': "url('/images/dot-underline.svg')",
        'dot-underline-white': "url('/images/dot-underline-white.svg')",
        'wave-underline-black': "url('/images/wave-underline.svg')",
        'wave-underline-white': "url('/images/wave-underline-white.svg')",
        'search-oval': "url('/icons/search-oval.svg')",
      },
      zIndex: {
        menu: '1310',
        'menu-side': '1309',
      },
      backgroundColor: {
        'yellow-base': 'var(--bg-yellow-base)',
        'pink-base': 'var(--bg-pink-base)',
      },
      colors: {
        'black-base': 'var(--fg-black-base)',
        'pink-base': 'var(--bg-pink-base)',
      },
      height: {
        'nav-top': '50px',
      },
      animation: {
        underline: 'underline 15s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
