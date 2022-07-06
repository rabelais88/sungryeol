import { PropsWithChildren } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

// color mode is not used because the project will prioritize static file generation
export const Chakra: React.FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
