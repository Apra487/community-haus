import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { ConnectButton } from '@/components/buttons';

export default function Home() {
  return (
    <main className="flex flex-col justify-center mt-10">
      <h1>Connect with your Collectors Today</h1>
      <ConnectButton />
    </main>
  );
}
