import type { AppProps } from 'next/app';
import { Box } from '@chakra-ui/react';
import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
import Menu from '@/components/Menu';
import { PropsWithChildren, useEffect, useState } from 'react';
import {
  AnimatePresence,
  AnimateSharedLayout,
  domAnimation,
  LazyMotion,
  motion,
} from 'framer-motion';
import * as animVariant from '@/constants/animVariant';
import TopBar from '@/components/TopBar';
import dynamic from 'next/dynamic';
import { Chakra } from '@/styles/Chakra';

const MotionBox = motion(Box);

const _Panels = () => {
  return (
    <>
      <MotionBox
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [null, 0, 0],
        }}
        exit={{
          height: [0, window.innerHeight, 0],
          top: [null, 0, 0],
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
        bgColor="bg-yellow"
        className="panel-left"
        position="fixed"
        layoutId="panel"
        left="0"
        width="50%"
        z="menu"
      />
      <MotionBox
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        exit={{
          height: [0, window.innerHeight, 0],
          bottom: [null, 0, 0],
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
        bgColor="bg-yellow"
        borderColor="black"
        className="panel-right"
        position="fixed"
        layoutId="panel"
        right="0"
        width="50%"
        z="menu"
      />
    </>
  );
};

// as panels use window Object, it needs to make sure it works for client-side
const Panels = dynamic(() => Promise.resolve(_Panels), { ssr: false });

interface IPageTransition {
  pageKey: string;
}
const PageTransition: React.FC<PropsWithChildren<IPageTransition>> = ({
  children,
  pageKey,
}) => {
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
            <Panels />
          </AnimatePresence>
        </Box>
      </AnimateSharedLayout>
    </LazyMotion>
  );
};

function MyApp({
  Component,
  pageProps,
  router,
}: AppProps & { cookies: string }) {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setMenuVisible(false);
  }, [router.pathname]);
  return (
    <Chakra>
      <GlobalStyleLoader />
      <TopBar onMenuToggle={() => setMenuVisible(!menuVisible)} />
      <Box className="margin-top-bar" height="50px" />
      <Menu visible={menuVisible} />
      {/* <PageTransition pageKey={router.pathname}> */}
      <Component {...pageProps} />
      {/* </PageTransition> */}
    </Chakra>
  );
}

export default MyApp;
