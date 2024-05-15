'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';

import { ConnectButton } from '@/components/buttons';

export default function Collector() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [communityArray, setCommunityArray] = useState([]);
  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toBase58();
      fetch(`/api/eligible-group?address=${address}`)
        .then((res) => res.json())
        .then((data: any) => {
          console.log(data.eligibleGroups);
          setCommunityArray(data.eligibleGroups);
        });
    }
  }, [publicKey]);

  return (
    <main className="container flex flex-col justify-center mt-10">
      <header className="absolute top-0 right-0 w-screen blurred-header h-28 z-50 flex items-center">
        <div className="container flex justify-between items-center">
          <Image
            src="/assets/logos/logo.svg"
            alt="logo"
            width={150}
            height={50}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <p className="justify-center text-[#8EFF01]">
            DRiP Communities for Collectors
          </p>
        </div>
      </header>
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
        <div className="fixed w-screen h-screen bg-collector top-0 right-0 bg-no-repeat bg-cover -z-50">
          {
            <div className="ml-32 mt-48 flex flex-col gap-5 overflow-y-scroll">
              {communityArray.length === 0 && publicKey && <>Loading...</>}
              {communityArray.length > 0 && publicKey && (
                <>
                  <h1 className="font-semibold text-xl">
                    Congratulations! You are eligible to join the follwing
                    community!
                  </h1>
                  {communityArray.map((community: any) => (
                    <div
                      key={community._id}
                      className="bg-tertiary p-4 rounded-2xl"
                    >
                      <h2>{community.username}</h2>
                      <p>{community.communityDescription}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          }
        </div>
      )}
    </main>
  );
}
