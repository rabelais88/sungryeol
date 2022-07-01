// https://chakra-ui.com/getting-started/nextjs-guide
import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '@/styles/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript
            initialColorMode={theme.config.initialColorMode}
            type="cookie"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
