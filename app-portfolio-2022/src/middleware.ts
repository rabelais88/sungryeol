import { NextMiddleware, NextResponse } from 'next/server';
import shortUrls from './constants/shortUrls';

export const middleware: NextMiddleware = (req, event) => {
  const pathname = req.nextUrl.pathname ?? '';
  const shortUrl = shortUrls[pathname] ?? '';
  if (shortUrl) return NextResponse.redirect(shortUrl);

  return NextResponse.next();
};
