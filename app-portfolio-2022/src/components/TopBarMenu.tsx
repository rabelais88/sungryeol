import { useDetectScrolled } from '@/lib/hooks';
import { useStoreContext } from '@/lib/store';
import {
  Box,
  Center,
  IconButton,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import AppLink from './AppLink';
import IconMenu from './icons/IconMenu';
import LogoText from './icons/LogoText';

const TopBarMenu: React.FC<Pick<PageProps, 'forceTopBarHide'>> = ({
  forceTopBarHide,
}) => {
  const { sideBarShow, setSideBarShow } = useStoreContext();
  const { colorMode } = useColorMode();
  const scrolled = useDetectScrolled();
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  if (forceTopBarHide) return null;

  return (
    <>
      <Box
        data-scrolled={scrolled && isSmallerThan800}
        // top={{ sm: scrolled ? '-70px' : 0, md: 0 }}
        sx={{
          '&[data-scrolled="true"]': {
            top: '-70px',
          },
        }}
        className="top-bar-menu"
        bgColor={colorMode === 'light' ? 'bg-yellow' : 'bg-pink'}
        position="fixed"
        w="100%"
        h="50px"
        borderBottomColor="#000"
        borderBottomWidth={colorMode === 'light' ? '1px' : '0px'}
        display="flex"
        alignItems="center"
        zIndex="menu"
        px="17px"
      >
        <IconButton
          aria-label="menu"
          variant="ghost"
          onClick={() => setSideBarShow(!sideBarShow)}
          sx={{
            _hover: {
              color: colorMode === 'light' ? '#fff' : '#000',
              bgColor: colorMode === 'light' ? '#000' : 'transparent',
            },
          }}
          h="100%"
          borderRadius="0"
        >
          <IconMenu w="32px" h="32px" />
        </IconButton>

        <Box flexGrow={1} />
        <AppLink
          variant="menu"
          aria-label="go back to index page"
          href="/"
          h="100%"
          sx={{
            _hover: {
              color: colorMode === 'light' ? '#fff' : '#000',
              bgColor: colorMode === 'light' ? '#000' : 'transparent',
            },
          }}
        >
          <Center w="100%" h="100%">
            <LogoText w="78px" />
          </Center>
        </AppLink>
      </Box>
    </>
  );
};

export default TopBarMenu;
