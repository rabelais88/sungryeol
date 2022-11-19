import { useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { mergeClass } from '@/lib';
import AppLink, { AppLinkProps } from './AppLink';

const MenuTab: React.FC<React.PropsWithChildren<AppLinkProps>> = ({
  children,
  ...props
}) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  return (
    <AppLink
      textAlign="left"
      h="44px"
      px="20px"
      pt="10px"
      _hover={{ textDecor: 'none' }}
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      sx={{
        borderBottomColor: colorMode === 'light' ? 'black' : 'white',
        '&.active,&:focus': {
          color: colorMode === 'light' ? 'bg-pink' : '#000',
          borderBottomColor: colorMode === 'light' ? 'bg-pink' : '#000',
          borderBottomWidth: '2px',
        },
      }}
      {...mergeClass(
        'menu-tab',
        router.pathname === props.href ? 'active' : ''
      )}
      {...props}
    >
      {children}
    </AppLink>
  );
};

export default MenuTab;
