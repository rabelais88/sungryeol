'use client';
// src/app/keystatic/layout.tsx
import KeystaticApp from './keystatic';

// export async function generateStaticParams() {
//   return [];
// }

export default function Layout() {
  return (
    <html>
      <head />
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
