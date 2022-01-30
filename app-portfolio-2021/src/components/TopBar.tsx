import {
  Box,
  IconButton,
  IconButtonProps,
  HStack,
  LinkBox,
  LinkOverlay,
  Slide,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import IconMenu from './icons/IconMenu';
import IconSearch from './icons/IconSearch';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LogoText from './icons/LogoText';
import { useRouter } from 'next/router';
import MarqueeBar from './Marquee';
import _debounce from 'lodash/debounce';
import { AnimatePresence, motion } from 'framer-motion';
import { menuSlideDown } from '@/constants/animVariant';

interface ITopBarProps {
  onMenuToggle?: () => void;
}

const MenuButton: React.FC<IconButtonProps> = (props) => (
  <IconButton
    borderRadius="0"
    icon={<IconMenu w="32px" h="32px" />}
    variant="ghost"
    height="100%"
    _hover={{
      bgColor: 'black',
      '.chakra-icon': {
        fill: 'black',
        path: {
          fill: 'white',
        },
      },
    }}
    {...props}
  />
);

const SearchButton: React.FC = () => (
  <NextLink href="/posts" passHref>
    <Link
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      aria-label="search posts"
      w="40px"
      _hover={{
        bgColor: 'black',
        '.chakra-icon': {
          fill: 'black',
          path: {
            fill: 'white',
          },
        },
      }}
    >
      <IconSearch />
    </Link>
  </NextLink>
);

const LogoButton: React.FC = () => {
  return (
    <LinkBox
      height="100%"
      px="18px"
      _hover={{
        bgColor: 'black',
        '.chakra-icon': { fill: 'black', path: { fill: 'white' } },
      }}
      aria-label="home(index) page"
    >
      <NextLink href="/" passHref>
        <LinkOverlay>
          <LogoText w="78px" h="18px" display="block" mt="16px" />
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};

const MotionBox = motion(Box);

const TopBar: React.FC<ITopBarProps> = ({ onMenuToggle = () => {} }) => {
  const [visible, setVisible] = useState(true);
  const scrollData = useRef(0);
  const router = useRouter();

  const onScroll = useCallback(() => {
    // can't use state inside callback
    const scroll = scrollData?.current ?? 0;
    const scrolledDown = scroll < window.scrollY;
    if (window.scrollY < 100) setVisible(true);
    else setVisible(!scrolledDown);
    scrollData.current = window.scrollY;
  }, [scrollData?.current]);

  const debouncedOnScroll = useMemo(
    () => _debounce(onScroll, 100, { trailing: true }),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnScroll);
    onScroll();
    return () => window.removeEventListener('scroll', debouncedOnScroll);
  }, []);
  const Bar = useMemo(
    () => (
      <Box
        bgColor="bg-yellow"
        className="top-bar"
        borderBottom="solid 1px black"
        h="50px"
        left="0"
        right="0"
      >
        <HStack h="100%" ml="18px">
          <MenuButton aria-label="open or close menu" onClick={onMenuToggle} />
          <SearchButton />
          <Box flexGrow="1" />
          <LogoButton />
        </HStack>
      </Box>
    ),
    [onMenuToggle]
  );

  const marqueeText = useMemo(
    () =>
      Array.from({ length: 5 })
        .map(() => '이 블로그의 깃헙 소스 보기 - see github code of this blog')
        .join(' - '),
    []
  );

  return (
    <Box position="fixed" w="100%" zIndex="1310" className="top-bar-container">
      <AnimatePresence exitBeforeEnter>
        {visible && (
          <MotionBox
            position="absolute"
            left="0"
            right="0"
            variants={menuSlideDown.variants}
            initial="hide"
            animate="show"
            exit="hide"
            transition={menuSlideDown.transition}
            key="topBar"
          >
            {Bar}
            {router.pathname === '/contact' && (
              <MarqueeBar>{marqueeText}</MarqueeBar>
            )}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TopBar;
