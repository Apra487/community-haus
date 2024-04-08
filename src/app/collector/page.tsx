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
      {!publicKey && (
        <div className="flex flex-col items-baseline justify-center fixed w-screen h-screen bg-collector top-0 right-0 bg-no-repeat bg-cover -z-50">
          <div className="ml-32">
            <span
              style={{ lineHeight: '75px' }}
              className="bg-transparent font-bold text-5xl max-md:text-4xl max-md:leading-[64px]"
            >
              Check Your{' '}
            </span>
            <section className="bg-accent inline text-5xl font-normal text-[rgb(0,0,0)]  max-md:text-4xl max-md:leading-[64px] ">
              <span className="bg-accent inline font-bold text-zinc-900">
                Eligibility{' '}
              </span>
            </section>
            <br></br>
            <span
              style={{ lineHeight: '75px' }}
              className="bg-transparent font-bold text-5xl max-md:text-4xl max-md:leading-[64px]"
            >
              To Join X Person<br></br> Community
            </span>
          </div>
          <ConnectButton />
        </div>
      )}
      {publicKey && (
        <div className="fixed w-screen h-screen bg-collector top-0 right-0 bg-no-repeat bg-cover -z-50"></div>
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
