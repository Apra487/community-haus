'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { ConnectButton } from '../buttons';

interface Props {
  superUsername: string;
  communities: any;
}
const map = {
  common: 'Common',
  legendary: 'Legendary',
  rare: 'Rare',
  rate: 'Rare',
  ultimate: 'Ultimate',
} as const;

interface CommunityProps {
  community: any;
  isEligibleToJoinTheCommunity: Function;
  handleTelegramJoining: Function;
}

const CommunityUrlCard: React.FC<CommunityProps> = ({
  community,
  isEligibleToJoinTheCommunity,
  handleTelegramJoining,
}) => {
  const [isCommunityJoining, setIsCommunityJoining] = useState(false);
  const [isCommunityJoined, setIsCommunityJoined] = useState(false);
  const isEligibleToJoinThisCommunity = isEligibleToJoinTheCommunity(community);
  return (
    <div
      key={community.chatID}
      className="px-5 py-3 mt-3 w-full bg-tertiary rounded-2xl flex justify-between"
    >
      <div>{`community.haus/community/${community.username}`}</div>
      {isEligibleToJoinThisCommunity ? (
        <button
          className="btn-tertiary"
          onClick={() => {
            if (isCommunityJoined) return;
            handleTelegramJoining(
              community,
              setIsCommunityJoining,
              setIsCommunityJoined
            );
          }}
        >
          {isCommunityJoined
            ? 'Joined'
            : isCommunityJoining
              ? 'Joining...'
              : 'Join Now'}
        </button>
      ) : (
        <button className="btn-disabled" disabled>
          Not Eligible
        </button>
      )}
    </div>
  );
};

const SuperJoinCard: React.FC<Props> = ({ superUsername, communities }) => {
  const { connected, publicKey } = useWallet();
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [telegramId, settelegramId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [eligibilityData, setEligibilityData] = useState<any>({});

  const handleTelegramJoining = useCallback(
    async (
      community: any,
      setIsCommunityJoining: Function,
      setIsCommunityJoined: Function
    ) => {
      if (!community.chatID) {
        console.error('Chat ID not found');
        return;
      }
      try {
        setIsCommunityJoining(true);
        const jsonFormatedBody = JSON.stringify({
          chatID: community.chatID,
          userID: telegramId,
          isSuperGroup: community.supergroup,
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
        setIsCommunityJoining(false);
      } catch {
        setIsCommunityJoining(false);
        setIsJoined(false);
        setIsCommunityJoined(false);
        console.error('Error joining telegram group');
      }
    },
    [telegramId, setIsJoined]
  );

  const isEligibleToJoinTheCommunity = useCallback(
    (community: any) => {
      if (!eligibilityData || !eligibilityData.criteriaBasedCount) return false;
      if (community.username.endsWith('-General')) {
        return (
          Number(eligibilityData.totalCount) >=
          Number(community.criteria.dropsNumber)
        );
      }
      if (community.username.endsWith('-Droplets')) {
        const eligibilityCriterias =
          Object.keys(eligibilityData.criteriaBasedCount) || [];
        const requiredDropletsCount = Number(community.criteria.droplets);
        let dropletsCount = 0;
        for (const criteria of eligibilityCriterias) {
          if (Number(criteria)) {
            dropletsCount += Number(
              eligibilityData.criteriaBasedCount[criteria]
            );
          }
        }
        return dropletsCount >= requiredDropletsCount;
      }

      const criteriaArr = [
        'common',
        'legendary',
        'rate',
        'rare',
        'ultimate',
      ] as const;

      const criteria = community.criteria || {};

      for (let i = 0; i < criteriaArr.length; i++) {
        const element = criteriaArr[i];
        if (criteria[element] !== -1) {
          const criteriaCount = Number(criteria[element]);
          const eligibilityCount =
            eligibilityData.criteriaBasedCount[map[element]] || 0;
          if (criteriaCount <= eligibilityCount) {
            return true;
          }
        }
      }
      return false;
    },
    [eligibilityData]
  );

  const isEligible = useMemo(() => {
    let canJoinACommunity = false;

    communities.forEach((community: any) => {
      if (isEligibleToJoinTheCommunity(community)) {
        canJoinACommunity = true;
      }
    });
    return canJoinACommunity;
  }, [communities, isEligibleToJoinTheCommunity]);

  useEffect(() => {
    async function checkIfEligible(address: string) {
      setCheckingEligibility(true);
      const mintAddress = communities[0].contractAddress;
      ////////
      // const adress = 'Av5FaWS5dEjAu7rRXRdmdqAqnJq9F88XNhKfBE2Gi5gg';
      // const mintAddres = 'FdjvW8RHo2vTr4DiWqkDHyUDhNWzkrYPjyd8SpGtK1Qs';
      /////////
      const response = await fetch(
        `/api/wallet-nft-info?address=${address}&mintAddress=${mintAddress}`
      );

      const data = await response.json();
      setEligibilityData(data);
      setCheckingEligibility(false);
    }
    if (publicKey) {
      const address = publicKey.toBase58();
      checkIfEligible(address);
    }
  }, [publicKey, communities]);

  return (
    <div>
      <div className="w-[716px] h-[354px] flex flex-col justify-between bg-header py-11 px-14">
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
          {` to join the ${superUsername} community!`}
        </h1>
        {isJoined ? (
          <p className="mt-10">
            You have been added to the group. Pleas check your telegram.
          </p>
        ) : (
          isEligible &&
          !checkingEligibility && (
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
        </div>
      </div>
      <div className="flex flex-col px-14">
        <p className="mt-10">
          {`Here's some of the communities you can join based on your eligibility.`}
        </p>
        {communities.map((community: any) => (
          <CommunityUrlCard
            key={community.chatID}
            community={community}
            isEligibleToJoinTheCommunity={isEligibleToJoinTheCommunity}
            handleTelegramJoining={handleTelegramJoining}
          />
        ))}
      </div>
    </div>
  );
};

export default SuperJoinCard;
