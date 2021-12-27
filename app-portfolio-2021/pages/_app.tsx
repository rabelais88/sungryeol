import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { testUtil } from '@sungryeol/lib';

function MyApp({ Component, pageProps }: AppProps) {
  testUtil(1, 2);
  return <Component {...pageProps} />;
}

export default MyApp;
