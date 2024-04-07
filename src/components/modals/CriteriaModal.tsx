'use client';
import React, { useState } from 'react';
import Modal from './Modal';
import { useCreateStore, ICreateStore } from '@/stores';

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

const CriteriaModal = () => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    formData.rarities.forEach(rarity => {
      // Map rarity to its corresponding criteria
      criteria[`${rarity.rarity.toLowerCase()}Criteria`] = rarity.value.toString();
    });

    const jsonFormData = {
      "creatorUsername": userName,
      "communityName": nameOfCommunity,
      "communityDescription": description,
      "creatorTelegramID": telegramId,
      "twitterUrl": twitterUrl,
      "contractAddress": address,
      "droplets": formData.droplets,
      "dropsNumber": formData.dropsOwned,
    }

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
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          You’re just one step away
          <br />
          <span className="text-accent">From creating your community!</span>
        </h1>
        <p className="justify-center text-secondary">
          Verify your existing social links to lorem ipsum dolor sit amet
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rarity Based:</label>
          {rarityToggles.map((toggle, index) => (
            <div key={toggle.rarity}>
              <label>
                <input
                  type="checkbox"
                  checked={toggle.isChecked}
                  onChange={() => handleRarityToggle(index)}
                  className="bg-tertiary"
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
                  className="bg-tertiary"
                />
              )}
            </div>
          ))}
        </div>

        <div>
          <label>Droplets Based:</label>
          <input
            type="number"
            value={droplets}
            onChange={handleNumericChange(setDroplets)}
            placeholder="Enter Droplets Value"
            className="bg-tertiary"
          />
        </div>

        <div>
          <label>Number of Drops Owned:</label>
          <input
            type="number"
            value={dropsOwned}
            onChange={handleNumericChange(setDropsOwned)}
            placeholder="Enter Number of Drops Owned"
            className="bg-tertiary"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default CriteriaModal;
