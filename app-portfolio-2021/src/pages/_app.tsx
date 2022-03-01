import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { Box } from '@chakra-ui/react';
// import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
import Menu from '@/components/Menu';
import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  AnimateSharedLayout,
  domAnimation,
  LazyMotion,
  motion,
} from 'framer-motion';
import * as animVariant from '@/constants/animVariant';
import '@/styles/global.css';
import TopBar from '@/components/TopBar';

const MotionBox = motion(Box);

interface IPageTransition {
  pageKey: string;
}
const PageTransition: React.FC<IPageTransition> = ({ children, pageKey }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimateSharedLayout>
        <Box className="app-wrap" position="relative" overflow-x="hidden">
          <AnimatePresence exitBeforeEnter>
            <MotionBox
              layoutId="pagewrap"
              key={pageKey}
              position="absolute"
              w="100%"
              className="page-wrap"
              initial="end"
              animate="start"
              exit="end"
              variants={{
                start: { opacity: 1 },
                end: { opacity: 0 },
              }}
            >
              {children}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </AnimateSharedLayout>
    </LazyMotion>
  );
};

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
      <PageTransition pageKey={router.pathname}>
        <Component {...pageProps} />
      </PageTransition>
    </ChakraProvider>
  );
}

export default MyApp;
