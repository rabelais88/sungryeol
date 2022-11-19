import {
  defineStyleConfig,
  extendTheme,
  StyleFunctionProps,
  ThemeConfig,
} from '@chakra-ui/react';

// responsive style with breakpoint example:
// https://chakra-ui.com/docs/styled-system/responsive-styles

const Heading = defineStyleConfig({
  variants: {
    post: {
      fontFamily: 'Title',
    },
  },
});

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
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
    menuSideBar: 1309,
    // modal: 1400,
    // popover: 1500,
    // skipLink: 1600,
    // toast: 1700,
    // tooltip: 1800,
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  fonts: {
    heading:
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    body: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    // mono: "Menlo, monospace",
  },
  components: {
    Heading,
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
  colors: {
    'bg-yellow': '#FEFCBF', // yellow.100
    'bg-pink': '#ED64A6', // pink.400
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      //         color: mode('gray.800', 'whiteAlpha.900')(props),
      '*::selection': {
        bgColor: props.colorMode === 'light' ? 'bg-yellow' : 'bg-pink',
      },
      '*::-moz-selection': {
        bgColor: props.colorMode === 'light' ? 'bg-yellow' : 'bg-pink',
      },
    }),
  },
});
