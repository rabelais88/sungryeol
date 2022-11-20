import { useStoreContext } from '@/lib/store';
import { Box, Switch, Text, useColorMode, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
        <LogoGeometry w="160px" h="68px" />
        <Text>color mode</Text>
        <Switch
          onChange={(ev) => setColorMode(ev.target.checked ? 'light' : 'dark')}
          isChecked={colorMode === 'light' ? true : false}
        />
        <MenuTab href="/posts">posts</MenuTab>
        <MenuTab href="/works">works</MenuTab>
        <MenuTab href="/contact">contact</MenuTab>
      </VStack>
    </Box>
  );
};

export default SideBarMenu;
