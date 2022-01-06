import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from '@chakra-ui/react';

const theme = extendTheme(
  {
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
      // modal: 1400,
      // popover: 1500,
      // skipLink: 1600,
      // toast: 1700,
      // tooltip: 1800,
    },
    colors: {
      'bg-yellow': 'yellow.100',
    },
  },
  withDefaultColorScheme({ colorScheme: 'gray', components: ['Button'] }),
  withDefaultProps({
    defaultProps: { variant: 'outline' as unknown as undefined },
    components: ['Button'],
  }),
  withDefaultProps({
    defaultProps: {
      variant: 'outline' as unknown as undefined,
    },
    components: ['Tag'],
  }),
  withDefaultProps({
    defaultProps: { variant: 'flushed' as unknown as undefined },
    components: ['Input'],
  })
);

export default theme;
