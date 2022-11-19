import BaseLayout from '@/components/layouts/BaseLayout';
import { StoreProvider } from '@/lib/store';
import '@/styles/globals.css';
import StyleProvider from '@/styles/StyleProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const author = 'Sungryeol Park';

const MetaData: React.FC<PageProps> = ({
  pageTitle,
  pageDescription,
  pageKeywords,
  pageImage,
}) => {
  return (
    <Head>
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
        integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
        crossOrigin="anonymous"
      /> */}
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/reset-min.css"
        integrity="sha256-QlHlZdbSVxaYkUHxhMFhAj/L3pJiW1LuomSCONXBWms="
        crossOrigin="anonymous"
      /> */}

      {/* Recommended Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="language" content="english" />
      <meta httpEquiv="content-type" content="text/html" />
      <meta name="author" content={author} />
      <meta name="designer" content={author} />
      <meta name="publisher" content={author} />
      {/* Search Engine Optimization Meta Tags */}
      {pageTitle ? (
        <title>{`JSGD:지식공단 - ${pageTitle}`}</title>
      ) : (
        <title>{`JSGD:지식공단 - Sungryeol`}</title>
      )}
      <meta
        name="description"
        content={pageDescription ?? `personal blog of Sungryeol`}
      />
      <meta name="keywords" content={(pageKeywords ?? []).join(',')} />
      <meta name="robots" content="index,follow" />
      <meta name="distribution" content="web" />
      {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
      <meta name="og:title" content={pageTitle} />
      <meta name="og:type" content="site" />
      {/* <meta name='og:url' content={url} /> */}
      <meta name="og:image" content={pageImage} />
      <meta name="og:site_name" content={pageTitle} />
      <meta name="og:description" content={pageDescription} />

      {/* Meta Tags for HTML pages on Mobile */}
      {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1, initial-scale=1.0"
      />
      {/* favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="naver-site-verification"
        content="e1500a61389cdfe00a20f70df752548d9af0bdab"
      />
    </Head>
  );
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const defaultProps = Component.defaultProps ?? {};
  return (
    <StoreProvider>
      <StyleProvider
        bodyPortal={defaultProps.bodyPortal}
        layout={pageProps?.layout ?? defaultProps?.layout ?? BaseLayout}
        forceTopBarHide={
          pageProps.forceTopBarHide ??
          Component.defaultProps?.forceTopBarHide ??
          false
        }
      >
        <MetaData {...pageProps} {...defaultProps} />
        <Component {...pageProps} />
      </StyleProvider>
    </StoreProvider>
  );
}
