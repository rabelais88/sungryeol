import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = (req, event) => {
  return NextResponse.next();
};
