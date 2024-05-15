// @ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { z } from 'zod';
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

const CountSchema = z
  .number()
  .positive('Must be a positive number')
  .min(1, 'Must be greater than zero');

interface Props {
  requiresGroupCreation: boolean;
  closeActon: () => void;
}

const CriteriaModal: React.FC<Props> = ({
  requiresGroupCreation,
  closeActon,
}) => {
  const criteriaSelectionLimit = 3;

  const router = useRouter();

  const [rarityToggles, setRarityToggles] =
    useState<RarityToggle[]>(RarityOptions);
  const [droplets, setDroplets] = useState<string>('');
  const [dropsOwned, setDropsOwned] = useState<string>('');
  const [isSumbitting, setIsSumbitting] = useState<boolean>(false);
  const [maxCriteriaSelectionReached, setMaxCriteriaSelectionReached] =
    useState<boolean>(false);
  const [commbinedRarityToggles, setCommbinedRarityToggles] = useState<{
    [name: string]: RarityToggle[];
  }>([]);

  const combinedRarityToggleLength = Object.keys(commbinedRarityToggles).length;

  const handleRarityToggle = (index: number) => {
    if (!requiresGroupCreation) {
      setRarityToggles((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, isChecked: !item.isChecked }
            : { ...item, isChecked: false }
        )
      );
      return;
    }
    setRarityToggles((prev) =>
      prev.map((item, i) =>
        i === index && (!maxCriteriaSelectionReached || item.isChecked)
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );
  };

  const handleRarityValueChange = (index: number, value: string) => {
    try {
      value !== '' && CountSchema.parse(Number(value));
    } catch (error) {
      alert(JSON.parse(error.message)[0].message);
      return;
    }
    if (!isNaN(Number(value))) {
      setRarityToggles((prev) =>
        prev.map((item, i) => (i === index ? { ...item, value } : item))
      );
    }
  };

  const handleNumericChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        e.target.value !== '' && CountSchema.parse(Number(e.target.value));
      } catch (error) {
        alert(JSON.parse(error.message)[0].message);
        return;
      }
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
    communityType,
    communityChatId,
    communityInviteLink,
    description,
    avatar,
  } = useCreateStore((store: ICreateStore) => ({
    twitterUrl: store.twitterUrl,
    address: store.address,
    telegramId: store.telegramId,
    userName: store.userName,
    nameOfCommunity: store.nameOfCommunity,
    communityType: store.communityType,
    communityChatId: store.communityChatId,
    communityInviteLink: store.communityInviteLink,
    description: store.description,
    avatar: store.avatar,
  }));
  const { updateSuperUsername, updateCommunityData } = useDashboardStore(
    (store: IDashboardStore) => ({
      updateSuperUsername: store.updateSuperUsername,
      updateCommunityData: store.updateCommunityData,
    })
  );

  const [rarityBasedEnabled, setRarityBasedEnabled] = useState<boolean>(false);
  const [dropletsBasedEnabled, setDropletsBasedEnabled] =
    useState<boolean>(false);
  const [dropsOwnedEnabled, setDropsOwnedEnabled] = useState<boolean>(false);

  const handleSumbitForChannelCreation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSumbitting(true);
    const formData = {
      rarities: rarityToggles
        .filter((toggle) => toggle.isChecked)
        .map(({ rarity, value }) => ({ rarity, value: value })),
      droplets: droplets,
      dropsOwned: dropsOwned,
    };
    const jsonFormatedData = {
      creatorUsername: userName,
      creatorTelegramID: telegramId,
      communityName: nameOfCommunity,
      communityDescription: description,
      twitterUrl: twitterUrl,
      contractAddress: address,
      isChannel: communityType === 'channel',
    };
    console.log('submit with channel creation', jsonFormatedData);
    let parentCommunityData: CommunityDataType | undefined;
    let communityDatas: CommunityDataType[] = [];
    try {
      // signle group creation
      if (formData.dropsOwned !== '') {
        const jsonBodyWithDropsOwned = {
          ...jsonFormatedData,
          creatorUsername: `${jsonFormatedData.creatorUsername}-General`,
          communityName: `${jsonFormatedData.communityName} (General)`,
          communityDescription: `General - ${jsonFormatedData.communityDescription}`,
          dropsNumber: formData.dropsOwned,
        };
        console.log(jsonBodyWithDropsOwned);
        const response = await fetch('/api/telegram/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBodyWithDropsOwned) || JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        avatarFormData.append(
          'username',
          `${jsonFormatedData.creatorUsername}-General`
        );
        const avatarReponse = await fetch('/api/avatar', {
          method: 'POST',
          body: avatarFormData,
        });

        const avatarData = await avatarReponse.json();
        data.avatar = avatarData.data.url;
        communityDatas.push(data);
        parentCommunityData = data.data;
      } else if (
        formData.droplets !== '' &&
        parentCommunityData === undefined
      ) {
        const jsonBodyWithDroplets = {
          ...jsonFormatedData,
          creatorUsername: `${jsonFormatedData.creatorUsername}-Droplets`,
          communityName: `${jsonFormatedData.communityName} (Droplets)`,
          communityDescription: `Droplets - ${jsonFormatedData.communityDescription}`,
          droplets: formData.droplets,
        };
        console.log(jsonBodyWithDroplets);
        const response = await fetch('/api/telegram/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBodyWithDroplets) || JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        avatarFormData.append(
          'username',
          `${jsonFormatedData.creatorUsername}-Droplets`
        );
        const avatarReponse = await fetch('/api/avatar', {
          method: 'POST',
          body: avatarFormData,
        });

        const avatarData = await avatarReponse.json();
        data.avatar = avatarData.data.url;

        communityDatas.push(data);
        parentCommunityData = data.data;
      } else if (parentCommunityData === undefined) {
        for (const rarity of formData.rarities) {
          const jsonBodyWithRarity = {
            ...jsonFormatedData,
            creatorUsername: `${jsonFormatedData.creatorUsername}-${rarity.rarity}`,
            communityName: `${jsonFormatedData.communityName} (${rarity.rarity})`,
            communityDescription: `${rarity.rarity} - ${jsonFormatedData.communityDescription}`,
            [`${rarity.rarity.toLowerCase()}Criteria`]: rarity.value,
          };
          console.log(jsonBodyWithRarity);
          const response = await fetch('/api/telegram/group', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBodyWithRarity) || JSON.stringify({}),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          const avatarFormData = new FormData();
          avatarFormData.append('avatar', avatar);
          avatarFormData.append(
            'username',
            `${jsonFormatedData.creatorUsername}-${rarity.rarity}`
          );
          const avatarReponse = await fetch('/api/avatar', {
            method: 'POST',
            body: avatarFormData,
          });

          const avatarData = await avatarReponse.json();
          data.avatar = avatarData.data.url;

          communityDatas.push(data);
          parentCommunityData = data.data;
          break;
        }
      }

      if (!parentCommunityData) {
        throw new Error('Parent community data is not available');
      }
      const newJsonFormatedData = {
        creatorUsername: userName,
        creatorTelegramID: telegramId,
        communityName: nameOfCommunity,
        communityDescription: description,
        twitterUrl: twitterUrl,
        contractAddress: address,
        isChannel: communityType === 'channel',
        inviteLink: parentCommunityData.telegramInviteLink,
        chatID: parentCommunityData.chatID,
      };

      if (
        formData.dropsOwned !== '' &&
        parentCommunityData.username !==
          `${newJsonFormatedData.creatorUsername}-General`
      ) {
        const jsonBodyWithDropsOwned = {
          ...newJsonFormatedData,
          creatorUsername: `${newJsonFormatedData.creatorUsername}-General`,
          communityName: `${newJsonFormatedData.communityName} (General)`,
          communityDescription: `General - ${newJsonFormatedData.communityDescription}`,
          dropsNumber: formData.dropsOwned,
        };
        console.log(jsonBodyWithDropsOwned);
        try {
          const reponse = await fetch('/api/group', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBodyWithDropsOwned) || JSON.stringify({}),
          });
          if (!reponse.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await reponse.json();
          console.log(data);

          await fetch('/api/telegram/topic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatID: parentCommunityData.chatID,
              topicName: 'General',
            }),
          });

          const avatarFormData = new FormData();
          avatarFormData.append('avatar', avatar);
          avatarFormData.append(
            'username',
            `${jsonBodyWithDropsOwned.creatorUsername}`
          );
          const avatarReponse = await fetch('/api/avatar', {
            method: 'POST',
            body: avatarFormData,
          });

          const avatarData = await avatarReponse.json();
          data.avatar = avatarData.data.url;

          communityDatas.push(data);
        } catch (error: any) {
          console.error(
            'Something went wrong while submitting without group creation for General:',
            error
          );
        }
      }
      if (
        formData.droplets !== '' &&
        parentCommunityData.username !==
          `${newJsonFormatedData.creatorUsername}-Droplets`
      ) {
        const jsonBodyWithDroplets = {
          ...newJsonFormatedData,
          creatorUsername: `${newJsonFormatedData.creatorUsername}-Droplets`,
          communityName: `${newJsonFormatedData.communityName} (Droplets)`,
          communityDescription: `Droplets - ${newJsonFormatedData.communityDescription}`,
          droplets: formData.droplets,
        };
        console.log(jsonBodyWithDroplets);
        try {
          const reponse = await fetch('/api/group', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBodyWithDroplets) || JSON.stringify({}),
          });
          if (!reponse.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await reponse.json();

          await fetch('/api/telegram/topic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatID: parentCommunityData.chatID,
              topicName: 'Droplets',
            }),
          });

          const avatarFormData = new FormData();
          avatarFormData.append('avatar', avatar);
          avatarFormData.append(
            'username',
            `${jsonBodyWithDroplets.creatorUsername}`
          );
          const avatarReponse = await fetch('/api/avatar', {
            method: 'POST',
            body: avatarFormData,
          });

          const avatarData = await avatarReponse.json();
          data.avatar = avatarData.data.url;

          communityDatas.push(data);
        } catch (error: any) {
          console.error(
            'Something went wrong while submitting without group creation for Droplets:',
            error
          );
        }
      }
      for (const rarity of formData.rarities) {
        if (
          parentCommunityData.username ===
          `${newJsonFormatedData.creatorUsername}-${rarity.rarity}`
        )
          continue;
        const jsonBodyWithRarity = {
          ...newJsonFormatedData,
          creatorUsername: `${newJsonFormatedData.creatorUsername}-${rarity.rarity}`,
          communityName: `${newJsonFormatedData.communityName} (${rarity.rarity})`,
          communityDescription: `${rarity.rarity} - ${newJsonFormatedData.communityDescription}`,
          [`${rarity.rarity.toLowerCase()}Criteria`]: rarity.value,
        };
        console.log(jsonBodyWithRarity);
        try {
          const reponse = await fetch('/api/group', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBodyWithRarity) || JSON.stringify({}),
          });
          if (!reponse.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await reponse.json();

          await fetch('/api/telegram/topic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatID: parentCommunityData.chatID,
              topicName: rarity.rarity,
            }),
          });

          const avatarFormData = new FormData();
          avatarFormData.append('avatar', avatar);
          avatarFormData.append(
            'username',
            `${jsonBodyWithRarity.creatorUsername}`
          );
          const avatarReponse = await fetch('/api/avatar', {
            method: 'POST',
            body: avatarFormData,
          });

          const avatarData = await avatarReponse.json();
          data.avatar = avatarData.data.url;

          communityDatas.push(data);
        } catch (error: any) {
          console.error(
            'Something went wrong while submitting without group creation for Droplets:',
            error
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      console.log(communityDatas);
      await updateCommunityData(communityDatas);
      updateSuperUsername(userName);
      router.push('/dashboard');
      closeActon();
    } catch (error: any) {
      console.error('Error:', error);
    }
    setIsSumbitting(false);
  };

  const handleSubmitWithoutGroupCreation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSumbitting(true);
    const jsonFormatedData = {
      creatorUsername: userName,
      creatorTelegramID: telegramId,
      communityName: nameOfCommunity,
      communityDescription: description,
      twitterUrl: twitterUrl,
      contractAddress: address,
      chatID: communityChatId,
      droplets: dropletsBasedEnabled ? droplets : '',
      dropsNumber: dropsOwnedEnabled ? dropsOwned : '',
      isSuperGroup: communityType === 'supergroup',
      inviteLink: communityInviteLink,
    };
    if (rarityBasedEnabled) {
      const rarities = rarityToggles
        .filter((toggle) => toggle.isChecked)
        .map(({ rarity, value }) => ({ rarity, value: value }));
      const rarity = rarities[0];
      jsonFormatedData.creatorUsername = `${jsonFormatedData.creatorUsername}-${rarity.rarity}`;
      jsonFormatedData.communityName = `${jsonFormatedData.communityName} (${rarity.rarity})`;
      jsonFormatedData.communityDescription = `${rarity.rarity} - ${jsonFormatedData.communityDescription}`;
      jsonFormatedData[`${rarity.rarity.toLowerCase()}Criteria`] = rarity.value;
    }
    if (dropletsBasedEnabled) {
      jsonFormatedData.creatorUsername = `${jsonFormatedData.creatorUsername}-Droplets`;
      jsonFormatedData.communityName = `${jsonFormatedData.communityName} (Droplets)`;
      jsonFormatedData.communityDescription = `Droplets - ${jsonFormatedData.communityDescription}`;
    }
    if (dropsOwnedEnabled) {
      jsonFormatedData.creatorUsername = `${jsonFormatedData.creatorUsername}-General`;
      jsonFormatedData.communityName = `${jsonFormatedData.communityName} (General)`;
      jsonFormatedData.communityDescription = `General - ${jsonFormatedData.communityDescription}`;
    }
    console.log('submit without group creation', jsonFormatedData);
    try {
      const reponse = await fetch('/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonFormatedData) || JSON.stringify({}),
      });
      if (!reponse.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await reponse.json();
      console.log(data);

      const avatarFormData = new FormData();
      avatarFormData.append('avatar', avatar);
      avatarFormData.append('username', `${jsonFormatedData.creatorUsername}`);
      const avatarReponse = await fetch('/api/avatar', {
        method: 'POST',
        body: avatarFormData,
      });

      const avatarData = await avatarReponse.json();
      data.avatar = avatarData.data.url;

      await updateCommunityData([data]);
      updateSuperUsername(userName);
      router.push('/dashboard');
      closeActon();
    } catch (error: any) {
      console.error(
        'Something went wrong while submitting without group creation:',
        error
      );
    }
    setIsSumbitting(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
    setIsSumbitting(true);
    const formData = {
      rarities: rarityToggles
        .filter((toggle) => toggle.isChecked)
        .map(({ rarity, value }) => ({ rarity, value: value })),
      droplets: droplets,
      dropsOwned: dropsOwned,
      combinedRarities: Object.values(commbinedRarityToggles),
    };
    const jsonFormatedData = {
      creatorUsername: userName,
      creatorTelegramID: telegramId,
      communityName: nameOfCommunity,
      communityDescription: description,
      twitterUrl: twitterUrl,
      contractAddress: address,
      isSuperGroup: communityType === 'supergroup',
    };

    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    try {
      let communityDatas: CommunityDataType[] = [];

      for (const combinedRarity of formData.combinedRarities) {
        const jsonBodyWithCombinedRarity = {
          ...jsonFormatedData,
          creatorUsername: `${jsonFormatedData.creatorUsername}-`,
          communityName: `${jsonFormatedData.communityName} (`,
          communityDescription: `${jsonFormatedData.communityDescription}`,
        };
        for (const rarity of combinedRarity) {
          jsonBodyWithCombinedRarity.creatorUsername += rarity.rarity;
          jsonBodyWithCombinedRarity.communityName += rarity.rarity;
          jsonBodyWithCombinedRarity[`${rarity.rarity.toLowerCase()}Criteria`] =
            rarity.value;
        }
        jsonBodyWithCombinedRarity.communityName += ')';
        const response = await fetch('/api/telegram/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:
            JSON.stringify(jsonBodyWithCombinedRarity) || JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        avatarFormData.append(
          'username',
          `${jsonBodyWithCombinedRarity.creatorUsername}`
        );
        const avatarReponse = await fetch('/api/avatar', {
          method: 'POST',
          body: avatarFormData,
        });

        const avatarData = await avatarReponse.json();
        data.avatar = avatarData.data.url;

        communityDatas.push(data);
        await delay(1000);
      }

      for (const rarity of formData.rarities) {
        const jsonBodyWithRarity = {
          ...jsonFormatedData,
          creatorUsername: `${jsonFormatedData.creatorUsername}-${rarity.rarity}`,
          communityName: `${jsonFormatedData.communityName} (${rarity.rarity})`,
          communityDescription: `${rarity.rarity} - ${jsonFormatedData.communityDescription}`,
          [`${rarity.rarity.toLowerCase()}Criteria`]: rarity.value,
        };
        console.log(jsonBodyWithRarity);
        const response = await fetch('/api/telegram/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBodyWithRarity) || JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        avatarFormData.append(
          'username',
          `${jsonFormatedData.creatorUsername}-${rarity.rarity}`
        );
        const avatarReponse = await fetch('/api/avatar', {
          method: 'POST',
          body: avatarFormData,
        });

        const avatarData = await avatarReponse.json();
        data.avatar = avatarData.data.url;

        communityDatas.push(data);
        await delay(1000);
      }

      if (formData.droplets !== '') {
        const jsonBodyWithDroplets = {
          ...jsonFormatedData,
          creatorUsername: `${jsonFormatedData.creatorUsername}-Droplets`,
          communityName: `${jsonFormatedData.communityName} (Droplets)`,
          communityDescription: `Droplets - ${jsonFormatedData.communityDescription}`,
          droplets: formData.droplets,
        };
        console.log(jsonBodyWithDroplets);
        const response = await fetch('/api/telegram/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBodyWithDroplets) || JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        avatarFormData.append(
          'username',
          `${jsonFormatedData.creatorUsername}-Droplets`
        );
        const avatarReponse = await fetch('/api/avatar', {
          method: 'POST',
          body: avatarFormData,
        });

        const avatarData = await avatarReponse.json();
        data.avatar = avatarData.data.url;

        communityDatas.push(data);
      }

      if (formData.dropsOwned !== '') {
        const jsonBodyWithDropsOwned = {
          ...jsonFormatedData,
          creatorUsername: `${jsonFormatedData.creatorUsername}-General`,
          communityName: `${jsonFormatedData.communityName} (General)`,
          communityDescription: `General - ${jsonFormatedData.communityDescription}`,
          dropsNumber: formData.dropsOwned,
        };
        console.log(jsonBodyWithDropsOwned);
        const response = await fetch('/api/telegram/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBodyWithDropsOwned) || JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        avatarFormData.append(
          'username',
          `${jsonFormatedData.creatorUsername}-General`
        );
        const avatarReponse = await fetch('/api/avatar', {
          method: 'POST',
          body: avatarFormData,
        });

        const avatarData = await avatarReponse.json();
        data.avatar = avatarData.data.url;
        communityDatas.push(data);
      }
      console.log(communityDatas);
      await updateCommunityData(communityDatas);
      updateSuperUsername(userName);
      router.push('/dashboard');
      closeActon();
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSumbitting(false);
  };

  useEffect(() => {
    const formData = {
      rarities: rarityToggles
        .filter((toggle) => toggle.isChecked)
        .map(({ rarity, value }) => ({ rarity, value: value })),
      droplets: droplets,
      dropsOwned: dropsOwned,
    };
    const raritySelected =
      combinedRarityToggleLength !== 0
        ? combinedRarityToggleLength + formData.rarities.length
        : formData.rarities.length;
    const dropletsSelected = formData.droplets !== '' ? 1 : 0;
    const dropsOwnedSelected = formData.dropsOwned !== '' ? 1 : 0;
    const totalSelected =
      raritySelected + dropletsSelected + dropsOwnedSelected;
    totalSelected >= criteriaSelectionLimit
      ? setMaxCriteriaSelectionReached(true)
      : setMaxCriteriaSelectionReached(false);
  }, [rarityToggles, droplets, dropsOwned, combinedRarityToggleLength]);

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
          <form
            onSubmit={
              requiresGroupCreation
                ? handleSubmit
                : handleSubmitWithoutGroupCreation
            }
          >
            <div>
              <label
                htmlFor="rarity"
                className="bg-tertiary cursor-pointer text-secondary rounded-xl py-3 px-4 mt-4 flex flex-row justify-between items-center text-sm leading-6 text-white"
                onClick={() => {
                  if (!requiresGroupCreation) {
                    setRarityBasedEnabled(!rarityBasedEnabled);
                    setDropletsBasedEnabled(false);
                    setDropsOwnedEnabled(false);
                    return;
                  }
                  setRarityBasedEnabled(!rarityBasedEnabled);
                }}
              >
                Rarity based
                <span>
                  <Image
                    src={'/assets/icons/down-arrow.svg'}
                    alt="down-arrow"
                    width={20}
                    height={20}
                  />
                </span>
              </label>
              {rarityBasedEnabled &&
                rarityToggles.map((toggle, index) => (
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
                className="bg-tertiary cursor-pointer text-secondary rounded-xl py-3 px-4 flex mt-5 flex-row justify-between items-center text-sm leading-6 text-white"
                onClick={() => {
                  if (!requiresGroupCreation) {
                    setDropletsBasedEnabled(!dropletsBasedEnabled);
                    setRarityBasedEnabled(false);
                    setDropsOwnedEnabled(false);
                    return;
                  }
                  setDropletsBasedEnabled(!dropletsBasedEnabled);
                }}
              >
                Drop number based
                <span>
                  <Image
                    src={'/assets/icons/down-arrow.svg'}
                    alt="down-arrow"
                    width={20}
                    height={20}
                  />
                </span>
              </label>

              {dropletsBasedEnabled && (
                <input
                  type="number"
                  value={droplets}
                  onChange={
                    !maxCriteriaSelectionReached || droplets !== ''
                      ? handleNumericChange(setDroplets)
                      : null
                  }
                  placeholder="Enter Number of Drops with Drop Number"
                  className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
                />
              )}
            </div>

            <div>
              <label
                htmlFor="dropsOwned"
                className="bg-tertiary cursor-pointer text-secondary rounded-xl py-3 px-4 flex flex-row mt-5 justify-between items-center text-sm leading-6 text-white"
                onClick={() => {
                  if (!requiresGroupCreation) {
                    setDropsOwnedEnabled(!dropsOwnedEnabled);
                    setRarityBasedEnabled(false);
                    setDropletsBasedEnabled(false);
                    return;
                  }
                  setDropsOwnedEnabled(!dropsOwnedEnabled);
                }}
              >
                Number of drops they own
                <span>
                  <Image
                    src={'/assets/icons/down-arrow.svg'}
                    alt="down-arrow"
                    width={20}
                    height={20}
                  />
                </span>
              </label>
              {dropsOwnedEnabled && (
                <input
                  type="number"
                  value={dropsOwned}
                  onChange={
                    !maxCriteriaSelectionReached || dropsOwned !== ''
                      ? handleNumericChange(setDropsOwned)
                      : null
                  }
                  placeholder="Enter Number of Drops Owned"
                  className="bg-tertiary w-full py-2 px-4 rounded-2xl focus:outline-none mt-2"
                />
              )}
            </div>
          </form>
          {communityType !== 'channel' && (
            <div>
              <h5 className="bg-tertiary cursor-pointer text-secondary rounded-xl py-3 px-4 flex flex-row mt-5 justify-between items-center text-sm leading-6 text-white">
                Combined criterias
                <button
                  onClick={() => {
                    const checkedRarityToggles = rarityToggles.filter(
                      (toggle) => toggle.isChecked
                    );
                    if (Object.values(commbinedRarityToggles).length === 0) {
                      let combinedName = '';
                      checkedRarityToggles.forEach((toggle) => {
                        combinedName += toggle.rarity;
                      });
                      setCommbinedRarityToggles({
                        [combinedName]: checkedRarityToggles,
                      });
                    } else {
                      const combinedRaretyTogglesKeys = Object.keys(
                        commbinedRarityToggles
                      );
                      checkedRarityToggles.forEach((toggle) => {
                        if (
                          !combinedRaretyTogglesKeys.includes(toggle.rarity) &&
                          combinedRaretyTogglesKeys.length < 3
                        ) {
                          let combinedName = '';
                          checkedRarityToggles.forEach((toggle) => {
                            combinedName += toggle.rarity;
                          });
                          setCommbinedRarityToggles((prev) => {
                            return {
                              ...prev,
                              [combinedName]: checkedRarityToggles,
                            };
                          });
                        }
                      });
                    }
                    setRarityToggles((prev) =>
                      prev.map((item) => ({
                        ...item,
                        isChecked: false,
                        value: '',
                      }))
                    );
                  }}
                  className="btn-primary py-1 px-3 text-xs mt-2"
                >
                  {'Add +'}
                </button>
              </h5>
              {Object.keys(commbinedRarityToggles).length !== 0 && (
                <div className="bg-tertiary rounded-xl mt-4 p-5">
                  {Object.keys(commbinedRarityToggles).map((key, index) => {
                    return (
                      <div key={key}>
                        {`${index + 1}. ${key}`}
                        {commbinedRarityToggles[key].map((toggle) => (
                          <div className="m-2 " key={toggle.rarity}>
                            <label className="flex flex-row w-full justify-between">
                              <div className="flex flex-row">
                                <input
                                  type="checkbox"
                                  checked={toggle.isChecked}
                                  className="bg-tertiary py-2 px-4 text-primary mr-5"
                                />
                                <h5 className="text-sm font-semibold">
                                  {toggle.rarity}
                                </h5>
                              </div>
                              <p className="text-sm ml-10">{toggle.value}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          <button
            onClick={
              communityType === 'channel'
                ? handleSumbitForChannelCreation
                : requiresGroupCreation
                  ? handleSubmit
                  : handleSubmitWithoutGroupCreation
            }
            className="btn-primary mt-6"
            type="submit"
            disabled={isSumbitting}
          >
            {isSumbitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CriteriaModal;
