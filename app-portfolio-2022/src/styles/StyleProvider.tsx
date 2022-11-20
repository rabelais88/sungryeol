import { PropsWithChildren } from 'react';
import { ChakraProvider, Progress } from '@chakra-ui/react';
import { theme } from '@/styles';
import TopBarMenu from '@/components/TopBarMenu';
import BaseLayout from '@/components/layouts/BaseLayout';
import SideBarMenu from '@/components/SideBarMenu';
import { useDetectScrolled, useRouteLoading } from '@/lib/hooks';
import { useStoreContext } from '@/lib/store';

const StyleProvider: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  layout,
  bodyPortal,
  forceTopBarHide,
}) => {
  const CurrentLayout = layout ?? BaseLayout;
  const { routeLoading } = useRouteLoading();
  const scrolled = useDetectScrolled();
  return (
    <ChakraProvider theme={theme}>
      <TopBarMenu forceTopBarHide={forceTopBarHide} />
      {routeLoading && (
        <Progress
          size="xs"
          isIndeterminate
          colorScheme="blackAlpha"
          position="fixed"
          top={scrolled ? '0px' : '50px'}
          zIndex="menu"
          w="100%"
        />
      )}
      <SideBarMenu />
      {bodyPortal ? bodyPortal : null}
      <CurrentLayout>{children}</CurrentLayout>
    </ChakraProvider>
  );
};

export default StyleProvider;
