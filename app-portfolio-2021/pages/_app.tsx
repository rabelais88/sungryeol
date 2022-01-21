import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { Box } from '@chakra-ui/react';
// import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
import Menu from '@/components/Menu';
import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from 'framer-motion';
import * as animVariant from '@/constants/animVariant';
import '@/styles/global.css';
import TopBar from '@/components/TopBar';

const MotionBox = motion(Box);

function MyApp({ Component, pageProps, router }: AppProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setMenuVisible(false);
  }, [router.pathname]);
  return (
    <ChakraProvider theme={theme}>
      {/* <GlobalStyleLoader /> */}
      <TopBar onMenuToggle={() => setMenuVisible(!menuVisible)} />
      <Box className="margin-top-bar" height="50px" />
      <Menu visible={menuVisible} />
      <LazyMotion features={domAnimation}>
        <Box className="app-wrap" position="relative">
          <AnimatePresence exitBeforeEnter>
            <MotionBox
              key={router.pathname}
              position="absolute"
              width="100%"
              className="page-wrap"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={animVariant.slideRight.variants}
              transition={animVariant.slideRight.transition}
            >
              <Component {...pageProps} />
            </MotionBox>
          </AnimatePresence>
        </Box>
      </LazyMotion>
    </ChakraProvider>
  );
}

export default MyApp;
