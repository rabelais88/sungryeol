import { useStoreContext } from '@/lib/store';
import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLink from './AppLink';
import IconMoon from './icons/IconMoon';
import IconSun from './icons/IconSun';
import LogoGeometry from './icons/LogoGeometry';
import MenuTab from './MenuTab';

const SideBarMenu: React.FC = () => {
  const { sideBarShow, setSideBarShow } = useStoreContext();
  const router = useRouter();
  const onRoutingStart = () => {
    setSideBarShow(false);
  };
  useEffect(() => {
    router?.events?.on('routeChangeStart', onRoutingStart);
    return () => {
      router?.events?.off('routeChangeStart', onRoutingStart);
    };
  });

  const { colorMode, setColorMode } = useColorMode();
  if (!sideBarShow) return null;
  return (
    <Box
      className="side-bar-menu"
      h="100%"
      position="fixed"
      zIndex="menuSideBar"
      bgColor={colorMode === 'light' ? 'bg-yellow' : 'bg-pink'}
      py="50px"
      w={{ sm: '100%', md: '288px' }}
    >
      <VStack>
        <Box height="50px" className="margin" />
        <AppLink href="/">
          <LogoGeometry w="160px" h="68px" />
        </AppLink>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="row"
        >
          <FormLabel mb="5px" marginInlineEnd="0" mr="8px">
            <IconMoon />
          </FormLabel>
          <Switch
            onChange={(ev) =>
              setColorMode(ev.target.checked ? 'light' : 'dark')
            }
            isChecked={colorMode === 'light' ? true : false}
          />
          <FormLabel mb="5px" marginInlineEnd="0" ml="8px">
            <IconSun />
          </FormLabel>
        </FormControl>
        <MenuTab href="/posts">posts</MenuTab>
        <MenuTab href="/works">works</MenuTab>
        <MenuTab href="/contact">contact</MenuTab>
      </VStack>
    </Box>
  );
};

export default SideBarMenu;
