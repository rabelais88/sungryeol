import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import TopBar from '@/components/TopBar';
import { Box } from '@chakra-ui/react';
import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
import Menu from '@/components/Menu';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setMenuVisible(false);
  }, [router.pathname]);
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyleLoader />
      <TopBar onMenuToggle={() => setMenuVisible(!menuVisible)} />
      <Box className="margin-top-bar" height="50px" />
      <Menu visible={menuVisible} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
