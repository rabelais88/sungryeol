import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { GlobalStyleProps, createBreakpoints } from '@chakra-ui/theme-tools';
const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});

// const config: ThemeConfig = {
//   initialColorMode: 'system',
//   useSystemColorMode: false,
// };

const theme = extendTheme({
  // config,
  fonts: {
    heading:
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    body: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
  },
  zIndices: {
    // hide: -1,
    // auto: 'auto',
    // base: 0,
    // docked: 10,
    // dropdown: 1000,
    // sticky: 1100,
    // banner: 1200,
    // overlay: 1300,
    menu: 1310,
    // modal: 1400,
    // popover: 1500,
    // skipLink: 1600,
    // toast: 1700,
    // tooltip: 1800,
  },
  colors: {
    'bg-yellow': '#FEFCBF', // yellow.100
    'bg-pink': '#ED64A6', // pink.400
  },
  styles: {
    global: ({ colorMode, theme: _theme }: GlobalStyleProps) => ({
      '*::selection': { bgColor: 'bg-yellow' },
      '*::-moz-selection': { bgColor: 'bg-yellow' },
    }),
  },
  breakpoints,
  components: {
    Button: {
      defaultProps: {
        variant: 'outline',
        colorScheme: 'gray',
      },
    },
    Tag: {
      defaultProps: {
        variant: 'outline',
      },
    },
    Input: {
      defaultProps: {
        variant: 'flushed',
      },
    },
  },
});

export default theme;
