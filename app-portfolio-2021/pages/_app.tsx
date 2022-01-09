import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import TopBar from '@/components/TopBar';
import { Box } from '@chakra-ui/react';
import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
import Menu from '@/components/Menu';
import { useEffect, useState } from 'react';
import // AnimatePresence,
// domAnimation,
// LazyMotion,
// m,
// motion,
'framer-motion';
// import * as animVariant from '@/constants/animVariant';

// const MotionBox = motion(Box);

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
      {/* <Box className="app-wrap" position="relative">
        <AnimatePresence exitBeforeEnter>
          <MotionBox
            key={router.pathname}
            position="absolute"
            width="100%"
            className="page-wrap"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animVariant.slideRight.variants}
            transition={animVariant.slideRight.transition}
          > */}
      <Component {...pageProps} />
      {/* </MotionBox>
        </AnimatePresence>
      </Box> */}
    </ChakraProvider>
  );
}

export default MyApp;
