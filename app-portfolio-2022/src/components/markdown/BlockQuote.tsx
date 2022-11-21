import { Box, BoxProps, useColorMode } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const BlockQuote: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="blockquote"
      bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      px="30px"
      py="15px"
      borderLeftStyle="solid"
      borderLeftWidth="4px"
      borderLeftColor={colorMode === 'light' ? 'gray.400' : 'gray.300'}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BlockQuote;
