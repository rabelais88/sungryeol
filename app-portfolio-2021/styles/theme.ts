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
