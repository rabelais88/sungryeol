import { PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles';
import TopBarMenu from '@/components/TopBarMenu';
import BaseLayout from '@/components/layouts/BaseLayout';
import SideBarMenu from '@/components/SideBarMenu';

const StyleProvider: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  layout,
  bodyPortal,
  forceTopBarHide,
}) => {
  const CurrentLayout = layout ?? BaseLayout;
  return (
    <ChakraProvider theme={theme}>
      <TopBarMenu forceTopBarHide={forceTopBarHide} />
      <SideBarMenu />
      {bodyPortal ? bodyPortal : null}
      <CurrentLayout>{children}</CurrentLayout>
    </ChakraProvider>
  );
};

export default StyleProvider;
