'use client';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { useSession, signIn, signOut } from "next-auth/react";

import { ConnectButton } from '@/components/buttons';

export default function Home() {
  const { data: session } = useSession()

  console.log(session);

  if (session) {
    return (
      <main className="flex flex-col justify-center mt-10">
        <p>Welcome {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </main>
    );
  }
  return (
    <main className="flex flex-col justify-center mt-10">
      <h1>Connect with your Collectors Today</h1>
      <ConnectButton />
      <p>Not Signed in</p>
      <button onClick={() => signIn('twitter')}>Sign in with X</button>
    </main>
  );
}
