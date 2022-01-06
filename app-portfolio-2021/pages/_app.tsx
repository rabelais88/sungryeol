import type { AppProps } from 'next/app';
import { testUtil } from '@sungryeol/lib';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import TopBar from '@/components/TopBar';
import { Box } from '@chakra-ui/react';
import GlobalStyleLoader from '@/styles/GlobalStyleLoader';

function MyApp({ Component, pageProps }: AppProps) {
  testUtil(1, 2);
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyleLoader />
      <TopBar />
      <Box className="margin-top-bar" height="50px" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
