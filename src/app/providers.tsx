'use client';
import { FC, useEffect, useState } from 'react';

import { WalletContextProvider } from '@/context';

const Providers: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <WalletContextProvider>{mounted && children}</WalletContextProvider>;
};

export default Providers;
