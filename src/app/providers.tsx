'use client';
import { FC, useEffect, useState } from 'react';

import { WalletContextProvider, ModalProvider } from '@/context';

const Providers: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WalletContextProvider>
      <ModalProvider>{mounted && children}</ModalProvider>
    </WalletContextProvider>
  );
};

export default Providers;
