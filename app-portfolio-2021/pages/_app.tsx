import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import TopBar from '@/components/TopBar';
import { Box } from '@chakra-ui/react';
import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
import Menu from '@/components/Menu';
import { useEffect, useState } from 'react';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import * as animVariant from '@/constants/animVariant';

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
      <LazyMotion features={domAnimation}>
        <m.div
          key={router.pathname}
          className="page-wrap"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animVariant.slideUp.variants}
          transition={animVariant.slideUp.transition}
        >
          <Component {...pageProps} />
        </m.div>
      </LazyMotion>
    </ChakraProvider>
  );
}

export default MyApp;
