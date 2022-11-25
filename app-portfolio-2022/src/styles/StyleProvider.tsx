import { PropsWithChildren } from 'react';
import { ChakraProvider, Progress, useMediaQuery } from '@chakra-ui/react';
import { theme } from '@/styles';
import TopBarMenu from '@/components/TopBarMenu';
import BaseLayout from '@/components/layouts/BaseLayout';
import SideBarMenu from '@/components/SideBarMenu';
import { useDetectScrolled, useRouteLoading } from '@/lib/hooks';

const StyleProvider: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  layout,
  bodyPortal,
  forceTopBarHide,
}) => {
  const CurrentLayout = layout ?? BaseLayout;
  const { routeLoading } = useRouteLoading();
  const scrolled = useDetectScrolled();
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return (
    <ChakraProvider theme={theme}>
      <TopBarMenu forceTopBarHide={forceTopBarHide} />
      {routeLoading && (
        <Progress
          size="xs"
          isIndeterminate
          colorScheme="blackAlpha"
          position="fixed"
          data-scrolled={scrolled && isSmallerThan800}
          sx={{
            top: '50px',
            '&[data-scrolled="true"]': {
              top: '0px',
            },
          }}
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
