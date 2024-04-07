'use client';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { ConnectButton } from '@/components/buttons';

export default function Collector() {
  const { publicKey } = useWallet();
  const [communityArray, setCommunityArray] = useState([]);

  console.log(communityArray);

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      fetch(`/api/wallet-community?address=${address}`)
        .then((res) => res.json())
        .then((data) => {
          setCommunityArray(data.communityArray);
        });
    }
  }, [publicKey]);
  return (
    <main className="container flex flex-col justify-center mt-10">
      <div className="fixed w-screen h-screen bg-collector top-0 right-0 bg-no-repeat bg-cover -z-50"></div>
      {!publicKey && (
        <>
          <h1>check your eligibility to join x person community</h1>
          <ConnectButton />
        </>
      )}
      {communityArray.length === 0 && publicKey && <>Loading...</>}
      {communityArray.length > 0 && publicKey && (
        <>
          <h1>
            Congratulations! You are eligible to join the common community!
          </h1>
        </>
      )}
    </main>
  );
}
