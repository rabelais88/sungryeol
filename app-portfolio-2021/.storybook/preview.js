// import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import GlobalStyleLoader from '@/styles/GlobalStyleLoader';
// https://www.npmjs.com/package/@chakra-ui/storybook-addon

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  chakra: { theme },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyleLoader />
      <Story />
    </>
  ),
];
