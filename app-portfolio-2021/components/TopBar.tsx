import {
  Box,
  Image,
  IconButton,
  IconButtonProps,
  HStack,
  LinkBox,
  LinkOverlay,
  Slide,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import IconMenu from './icons/IconMenu';
import IconSearch from './icons/IconSearch';
import { useEffect, useMemo, useState } from 'react';

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
  <LinkBox
    _hover={{
      bgColor: 'black',
      '.chakra-icon': {
        fill: 'black',
        path: {
          fill: 'white',
        },
      },
    }}
    h="100%"
    w="40px"
  >
    <NextLink href="/posts" passHref>
      <LinkOverlay
        h="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <IconSearch />
      </LinkOverlay>
    </NextLink>
  </LinkBox>
);

const TopBar: React.FC<ITopBarProps> = ({ onMenuToggle = () => {} }) => {
  const [visible, setVisible] = useState(true);
  const [scroll, setScroll] = useState(0);
  const onScroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setVisible(scroll < 100);
  }, [scroll]);
  const Bar = useMemo(
    () => (
      <Box
        bgColor="yellow.100"
        className="top-bar"
        borderBottom="solid 1px black"
        height="100%"
        h="50px"
        left="0"
        right="0"
      >
        <HStack h="100%" ml="18px">
          <MenuButton aria-label="open or close menu" onClick={onMenuToggle} />
          <SearchButton />
        </HStack>
        <Image
          src="/logo-text.svg"
          alt="text logo for this blog"
          position="absolute"
          right="29px"
          top="16px"
        />
      </Box>
    ),
    [onMenuToggle]
  );
  return (
    <Slide direction="top" in={visible} style={{ zIndex: 'overlay' }}>
      {Bar}
    </Slide>
  );
};

export default TopBar;
