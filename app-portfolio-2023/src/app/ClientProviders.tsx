'use client';

import { Provider } from 'jotai';
import { PropsWithChildren } from 'react';

const ClientProviders = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default ClientProviders;
