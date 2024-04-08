'use client';
import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { ConnectButton } from '../buttons';

interface Props {
  communityData: any;
}

const JoinCard: React.FC<Props> = ({ communityData }) => {
  const { connected, publicKey } = useWallet();
  const [isEligible, setIsEligible] = useState(false);
  const [checkingEligibility, setCheckingEligibility] = useState(false);

  useEffect(() => {
    async function checkIfEligible(address: string) {
      setCheckingEligibility(true);
      const response = await fetch(`/api/community?contractAddress=${address}`);
      const data = await response.json();
      console.log(data);
      setIsEligible(false);
      setCheckingEligibility(false);
    }
    if (publicKey) {
      const address = publicKey.toBase58();
      checkIfEligible(address);
    }
  }, [publicKey]);

  return (
    <div className="w-[716px] h-[354px] flex flex-col justify-between bg-header mt-32 py-11 px-14">
      <h1 className="text-primary text-5xl font-bold">
        {`${
          isEligible
            ? `Congratulations! `
            : connected && !checkingEligibility && !isEligible
              ? `Oops! `
              : `Check your `
        }`}
        <span className="text-accent">{`${
          isEligible
            ? `You are eligible`
            : connected && !checkingEligibility && !isEligible
              ? `You are currently not eligible`
              : `Eligibility`
        }`}</span>
        {`${
          isEligible
            ? ` to join the common community!`
            : connected && !checkingEligibility && !isEligible
              ? ` to join the ultimate community!`
              : ` to join
              x person community`
        }`}
      </h1>
      <div className="flex gap-5 mt-5">
        {!connected && <ConnectButton />}
        {checkingEligibility && (
          <button className="btn-secondary mt-5">
            Checking Eligibility...
          </button>
        )}
        {isEligible && <button className="btn-secondary mt-5">Join Now</button>}
        <button className="btn-secondary mt-5">Create</button>
      </div>
    </div>
  );
};

export default JoinCard;
