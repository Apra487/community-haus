// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import {
  useCreateStore,
  ICreateStore,
  useDashboardStore,
  type CommunityDataType,
  type IDashboardStore,
} from '@/stores';

interface RarityToggle {
  rarity: string;
  placeholder: string;
  isChecked: boolean;
  value: string;
}

const RarityOptions: RarityToggle[] = [
  {
    rarity: 'Common',
    placeholder: 'Enter Common Value',
    isChecked: false,
    value: '',
  },
  {
    rarity: 'Rare',
    placeholder: 'Enter Rare Value',
    isChecked: false,
    value: '',
  },
  {
    rarity: 'Legendary',
    placeholder: 'Enter Legendary Value',
    isChecked: false,
    value: '',
  },
  {
    rarity: 'Ultimate',
    placeholder: 'Enter Ultimate Value',
    isChecked: false,
    value: '',
  },
];

interface Props {
  closeActon: () => void;
}

const CriteriaModal: React.FC<Props> = ({ closeActon }) => {
  const router = useRouter();

  const [rarityToggles, setRarityToggles] =
    useState<RarityToggle[]>(RarityOptions);
  const [droplets, setDroplets] = useState<string>('');
  const [dropsOwned, setDropsOwned] = useState<string>('');

  const handleRarityToggle = (index: number) => {
    setRarityToggles((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleRarityValueChange = (index: number, value: string) => {
    if (!isNaN(Number(value))) {
      setRarityToggles((prev) =>
        prev.map((item, i) => (i === index ? { ...item, value } : item))
      );
    }
  };

  const handleNumericChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!isNaN(Number(value))) {
        setter(value);
      }
    };
  const {
    twitterUrl,
    address,
    telegramId,
    userName,
    nameOfCommunity,
    description,
  } = useCreateStore((store: ICreateStore) => ({
    twitterUrl: store.twitterUrl,
    address: store.address,
    telegramId: store.telegramId,
    userName: store.userName,
    nameOfCommunity: store.nameOfCommunity,
    description: store.description,
  }));
  const { updateCommunityData } = useDashboardStore(
    (store: IDashboardStore) => ({
      updateCommunityData: store.updateCommunityData,
    })
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');
    console.log(event);

    event.preventDefault();

    const formData = {
      rarities: rarityToggles
        .filter((toggle) => toggle.isChecked)
        .map(({ rarity, value }) => ({ rarity, value: Number(value) })),
      droplets: Number(droplets),
      dropsOwned: Number(dropsOwned),
    };

    console.log(formData);

    const criteria: { [key: string]: string } = {};

    formData.rarities.forEach((rarity) => {
      // Map rarity to its corresponding criteria
      criteria[`${rarity.rarity.toLowerCase()}Criteria`] =
        rarity.value.toString();
    });

    const jsonFormData = {
      creatorUsername: userName,
      communityName: nameOfCommunity,
      communityDescription: description,
      creatorTelegramID: telegramId,
      twitterUrl: twitterUrl,
      contractAddress: address,
      droplets: formData.droplets,
      dropsNumber: formData.dropsOwned,
    };

    Object.keys(criteria).forEach((key) => {
      // @ts-ignore
      jsonFormData[key as keyof typeof jsonFormData] = criteria[key] as string;
    });

    console.log(jsonFormData);

    fetch('/api/telegram/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonFormData) || JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: CommunityDataType) => {
        console.log('Success:', data);
        closeActon();
        updateCommunityData(data);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          You’re just one step away <br />
          <span className="text-accent">From creating your community!</span>
        </h1>
        <div className="flex flex-col justify-center mt-10">
          <p className="justify-center text-primary font-bold text-base">
            What should be a collector’s criteria for joining your community?
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="rarity"
                className="bg-tertiary text-secondary rounded-xl py-3 px-4 mt-4 flex flex-col justify-center items-start text-sm leading-6 text-white"
              >
                Rarity based
              </label>
              {rarityToggles.map((toggle, index) => (
                <div className="m-2 " key={toggle.rarity}>
                  <label>
                    <input
                      type="checkbox"
                      checked={toggle.isChecked}
                      onChange={() => handleRarityToggle(index)}
                      className="bg-tertiary py-2 px-4 text-primary mr-5"
                    />
                    {toggle.rarity}
                  </label>
                  {toggle.isChecked && (
                    <input
                      type="number"
                      value={toggle.value}
                      onChange={(e) =>
                        handleRarityValueChange(index, e.target.value)
                      }
                      placeholder={toggle.placeholder}
                      className="bg-tertiary text-sm text-primary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
                    />
                  )}
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="droplets"
                className="bg-tertiary text-secondary rounded-xl py-3 px-4 flex mt-5 flex-col justify-center items-start text-sm leading-6 text-white"
              >
                Droplets based
              </label>

              <input
                type="number"
                value={droplets}
                onChange={handleNumericChange(setDroplets)}
                placeholder="Enter Droplets Value"
                className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
              />
            </div>

            <div>
              <label
                htmlFor="dropsOwned"
                className="bg-tertiary text-secondary rounded-xl py-3 px-4 flex flex-col mt-5 justify-center items-start text-sm leading-6 text-white"
              >
                Number of drops they own
              </label>
              <input
                type="number"
                value={dropsOwned}
                onChange={handleNumericChange(setDropsOwned)}
                placeholder="Enter Number of Drops Owned"
                className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
              />
            </div>
          </form>
          <button
            onClick={(e) => handleSubmit(e)}
            className="btn-primary mt-6"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CriteriaModal;
