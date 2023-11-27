import type { Metadata } from 'next';
import './globals.css';
import {
  fontHammersmithOne,
  fontPretendard,
  fontTungkeun,
} from '@/styles/font';
import { joinClass } from '@/utils';
import NavTop from '@/components/NavTop';
import NavLeft from '@/components/NavLeft';
import { PropsWithChildren } from 'react';
import ClientProviders from './ClientProviders';

export const metadata: Metadata = {
  title: '성렬:Sungryeol',
  description: 'Blog of Sungryeol',
};

export default function RootLayout({ children }: PropsWithChildren) {
  // @ts-ignore
  const pathname = (children?.props?.childPropSegment as string) ?? '';
  if (pathname === 'keystatic')
    return (
      <html>
        <body>{children}</body>
      </html>
    );
  return (
    <html>
      <ClientProviders>
        <body
          className={joinClass(
            fontTungkeun.variable,
            fontHammersmithOne.variable,
            fontPretendard.variable,
            'font-sans'
          )}
        >
          <NavTop />
          <NavLeft />
          <div className="h-nav-top" />
          {children}
        </body>
      </ClientProviders>
    </html>
  );
}
