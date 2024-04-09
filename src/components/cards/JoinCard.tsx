'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { ConnectButton } from '../buttons';

interface Props {
  communityData: any;
}
const map = {
  common: 'Common',
  legendary: 'Legendary',
  rare: 'Rare',
  rate: 'Rare',
  ultimate: 'Ultimate',
} as const;

const JoinCard: React.FC<Props> = ({ communityData }) => {
  const { connected, publicKey } = useWallet();
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [telegramId, settelegramId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleTelegramJoining = useCallback(async () => {
    if (!communityData.chatID) {
      console.error('Chat ID not found');
      return;
    }
    try {
      setIsJoining(true);
      const jsonFormatedBody = JSON.stringify({
        chatID: communityData.chatID,
        userID: telegramId,
      });
      const response = await fetch('/api/telegram/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonFormatedBody || JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === 'User invited') {
        setIsJoined(true);
      }
      setIsJoining(false);
    } catch {
      setIsJoining(false);
      setIsJoined(false);
      console.error('Error joining telegram group');
    }
  }, [communityData.chatID, telegramId, setIsJoining, setIsJoined]);

  // useEffect(() => {
  //   async function checkIfEligible(address: string) {
  //     setCheckingEligibility(true);
  //     const response = await fetch(`/api/wallet-nft?address=${address}`);
  //     const data = await response.json();
  //     const mintAddresses = data.mintAddressArray;
  //     if (
  //       mintAddresses &&
  //       mintAddresses.length > 0 &&
  //       mintAddresses.includes(communityData.contractAddress)
  //     ) {
  //       console.log('User has the NFT');
  //       const criteria = communityData.criteria;
  //       const rarityTypes = ['Rarity', 'Drop'];

  //       // todo: remove this code (required for demo)
  //       rarityTypes.push('Animal');
  //       const userAddress = '6gLzpZQ9DZ7X8KZJWsBuaxkT4RCwiHPv2PZ52nARFHqw';
  //       const mintAddress = 'E3hZtaq2kAGRoyhbLjKLHybyyZCNv8ZR6RU5tSErgMjf';
  //       //////////////////////////////////////////////

  //       const mintAttributesResponse = await fetch(
  //         `/api/mint-attributes?userAddress=${userAddress}&mintAddress=${mintAddress}`
  //       );
  //       const mintAttributesData = await mintAttributesResponse.json();
  //       const filterdAttributes = mintAttributesData.attributes.filter(
  //         (attribute: any) => rarityTypes.includes(attribute.trait_type)
  //       );
  //       const filteredCriteria = Object.keys(criteria).filter(
  //         (key) => criteria[key] !== ''
  //       );

  //       // todo: remove this code (required for demo)
  //       filteredCriteria.push('Rat');
  //       //////////////////////////////////////////////

  //       const finalFilter = filterdAttributes.filter((attribute: any) =>
  //         filteredCriteria.includes(attribute.value)
  //       );
  //       const isEligible = finalFilter.length > 0;
  //       console.log(isEligible);
  //       setIsEligible(isEligible);
  //       setCheckingEligibility(false);
  //       return;
  //     }
  //     setIsEligible(false);
  //     setCheckingEligibility(false);
  //   }
  //   if (publicKey) {
  //     const address = publicKey.toBase58();
  //     checkIfEligible(address);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [publicKey]);

  console.log(communityData);
  const [eligibilityData, setEligibilityData] = useState<any>({});
  useEffect(() => {
    async function checkIfEligible(address: string) {
      setCheckingEligibility(true);
      const mintAddress = communityData.contractAddress;
      ////////
      // const adress = 'Av5FaWS5dEjAu7rRXRdmdqAqnJq9F88XNhKfBE2Gi5gg';
      // const mintAddres = 'FdjvW8RHo2vTr4DiWqkDHyUDhNWzkrYPjyd8SpGtK1Qs';
      /////////
      const response = await fetch(
        `/api/wallet-nft-info?address=${address}&mintAddress=${mintAddress}`
      );
      const data = await response.json();
      setEligibilityData(data?.criteriaBasedCount);
      setCheckingEligibility(false);
    }
    if (publicKey) {
      const address = publicKey.toBase58();
      checkIfEligible(address);
    }
  }, [publicKey, communityData.contractAddress]);

  const isEligible = useMemo(() => {
    const criteriaArr = ['common', 'legendary', 'rate', 'rare', 'ultimate'] as const;

    const criteria = communityData.criteria || {};

    for (let i = 0; i < criteriaArr.length; i++) {
      const element = criteriaArr[i];
      if (criteria[element] !== '') {
        const criteriaCount = Number(criteria[element]);
        const eligibilityCount = eligibilityData[map[element]] || 0;
        if (criteriaCount <= eligibilityCount) {
          return true;
        }
      }
    }

    return false;
  }, [communityData.criteria, eligibilityData]);

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
        {` to join the ${communityData.communityName} community!`}
      </h1>
      {isJoined ? (
        <p className="mt-10">
          You have been added to the group. Pleas check your telegram.
        </p>
      ) : (
        isEligible && (
          <div className="bg-primary-dark rounded-2xl mt-5">
            <input
              type="text"
              id="telegramId"
              name="telegramId"
              placeholder="@ Enter your Telegram ID"
              aria-label="Telegram ID"
              className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none "
              value={telegramId}
              onChange={(e) => settelegramId(e.target.value)}
            />
          </div>
        )
      )}
      <div className="flex gap-5">
        {!connected && <ConnectButton />}
        {checkingEligibility && (
          <button className="btn-secondary mt-5">
            Checking Eligibility...
          </button>
        )}
        {isEligible && !isJoined && (
          <button
            className="btn-secondary mt-5"
            onClick={() => {
              handleTelegramJoining();
            }}
          >
            {isJoining ? 'Joining...' : 'Join Now'}
          </button>
        )}
        {/* <button
          className="btn-secondary mt-5"
          onClick={() => router.push('/creator')}
        >
          Create
        </button> */}
      </div>
    </div>
  );
};

export default JoinCard;
