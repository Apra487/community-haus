'use client;';
import React, { useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';

import Modal from './Modal';
import { useCreateStore, ICreateStore } from '@/stores';

type FormState = {
  username: string;
  telegramId: string;
  communityName: string;
  communityType: 'group' | 'supergroup';
  communityChatId: string;
  communityInviteLink: string;
  description: string;
  logo: File | undefined;
};

const FormStateSchemaWithoutGroupCreation = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username must contain only letters, numbers, and underscores'
    ),
  communityChatId: z
    .string()
    .regex(/^-?\d+(.\d+)?$/, 'Community Chat ID must be a number'),
});

const FormStateSchemaWithGroupCreation = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username must contain only letters, numbers, and underscores'
    ),
});

interface Props {
  requiresGroupCreation: boolean;
  closeActon: () => void;
}

const CreateModal: React.FC<Props> = ({
  requiresGroupCreation,
  closeActon,
}) => {
  const {
    updateUserName,
    updateTelegramId,
    updateNameOfCommunity,
    updateCommunityType,
    updateCommunityChatId,
    updateDescription,
    updateAvatar,
    updateCommunityInviteLink,
  } = useCreateStore((store: ICreateStore) => ({
    updateUserName: store.updateUserName,
    updateTelegramId: store.updateTelegramId,
    updateNameOfCommunity: store.updateNameOfCommunity,
    updateCommunityType: store.updateCommunityType,
    updateCommunityChatId: store.updateCommunityChatId,
    updateDescription: store.updateDescription,
    updateAvatar: store.updateAvatar,
    updateCommunityInviteLink: store.updateCommunityInviteLink,
  }));

  const [formState, setFormState] = useState<FormState>({
    username: '',
    telegramId: '',
    communityName: '',
    communityType: 'group',
    communityChatId: '',
    communityInviteLink: '',
    description: '',
    logo: undefined,
  });
  const [toggleInstructions, setToggleInstructions] = useState(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    try {
      requiresGroupCreation
        ? FormStateSchemaWithGroupCreation.parse(formState)
        : FormStateSchemaWithoutGroupCreation.parse(formState);
    } catch (error: any) {
      alert(JSON.parse(error.message)[0].message);
      return;
    }
    updateUserName(formState.username);
    updateTelegramId(formState.telegramId);
    updateNameOfCommunity(formState.communityName);
    updateCommunityType(formState.communityType);
    updateCommunityChatId(formState.communityChatId);
    updateCommunityInviteLink(formState.communityInviteLink);
    updateDescription(formState.description);
    updateAvatar(formState.logo);
    console.log(formState);

    const res = await fetch(
      `/api/check/super-username?superUsername=${formState.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.alredyExists) {
      alert('Username should be unique!');
      return;
    }

    closeActon();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFormState({ ...formState, logo: files[0] });
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        setUploadedImageSrc(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Modal>
      <div className="relative flex flex-col p-5">
        <Image
          src="/assets/bgs/cover.svg"
          alt="cover-image"
          width={440}
          height={207}
        />
        <div className="relative">
          <Image
            src={
              uploadedImageSrc ? uploadedImageSrc : '/assets/bgs/profile.svg'
            }
            alt="cover-image"
            width={132}
            height={132}
            className={`${!uploadedImageSrc && 'opacity-50'} absolute -translate-x-1/2 -translate-y-2/3 left-1/2 rounded-full`}
          />
        </div>
        <form onSubmit={handleSubmit} className=" mt-5">
          <div className="flex flex-col justify-center mt-5">
            <label
              htmlFor="username"
              className="flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="Enter you community username"
              value={formState.username}
              onChange={handleChange}
              required
              className="bg-tertiary w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
            />
          </div>
          <p className="text-xs text-secondary mt-1">
            Your profile will be available on
            communityhaus.com/community/[username]
          </p>
          <label
            htmlFor="telegramId"
            className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
          >
            Telegram ID
            <input
              name="telegramId"
              type="text"
              placeholder="Enter your Telegram ID"
              value={formState.telegramId}
              onChange={handleChange}
              required
              className="bg-tertiary w-full text-sm py-3 px-4 font-normal rounded-2xl focus:outline-none mt-2"
            />
          </label>
          <label
            htmlFor="communityName"
            className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
          >
            Name of the Community
            <input
              name="communityName"
              type="text"
              value={formState.communityName}
              placeholder="Enter the name of your community"
              onChange={handleChange}
              required
              className="bg-tertiary w-full font-normal text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
            />
          </label>
          <label
            htmlFor="communityType"
            className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
          >
            Type of the Community
            <div className="flex flex-row items-center mt-2 justify-between gap-5">
              <div className="flex items-center">
                <input
                  id="group-radio"
                  type="radio"
                  value="group"
                  name="communityType"
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange}
                  checked={formState.communityType === 'group'}
                />
                <label
                  htmlFor="group-radio"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Group
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="supergroup-radio"
                  type="radio"
                  value="supergroup"
                  name="communityType"
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange}
                  checked={formState.communityType === 'supergroup'}
                />
                <label
                  htmlFor="supergroup-radio"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Supergroup
                </label>
              </div>
            </div>
          </label>
          {!requiresGroupCreation && (
            <label
              htmlFor="communityChatId"
              className="mt-3 relative flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
            >
              Group Chat ID
              <span
                className="absolute top-[2px] left-[100px] cursor-pointer"
                onClick={() => setToggleInstructions(!toggleInstructions)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16667 14.1666H10.8333V9.16663H9.16667V14.1666ZM10 7.49996C10.2361 7.49996 10.4342 7.41996 10.5942 7.25996C10.7542 7.09996 10.8339 6.90218 10.8333 6.66663C10.8328 6.43107 10.7528 6.23329 10.5933 6.07329C10.4339 5.91329 10.2361 5.83329 10 5.83329C9.76389 5.83329 9.56612 5.91329 9.40667 6.07329C9.24723 6.23329 9.16723 6.43107 9.16667 6.66663C9.16612 6.90218 9.24612 7.10024 9.40667 7.26079C9.56723 7.42135 9.76501 7.50107 10 7.49996ZM10 18.3333C8.84723 18.3333 7.7639 18.1144 6.75001 17.6766C5.73612 17.2388 4.85417 16.6452 4.10417 15.8958C3.35417 15.1463 2.76056 14.2644 2.32334 13.25C1.88612 12.2355 1.66723 11.1522 1.66667 9.99996C1.66612 8.84774 1.88501 7.7644 2.32334 6.74996C2.76167 5.73552 3.35528 4.85357 4.10417 4.10413C4.85306 3.35468 5.73501 2.76107 6.75001 2.32329C7.76501 1.88551 8.84834 1.66663 10 1.66663C11.1517 1.66663 12.235 1.88551 13.25 2.32329C14.265 2.76107 15.147 3.35468 15.8958 4.10413C16.6447 4.85357 17.2386 5.73552 17.6775 6.74996C18.1164 7.7644 18.335 8.84774 18.3333 9.99996C18.3317 11.1522 18.1128 12.2355 17.6767 13.25C17.2406 14.2644 16.647 15.1463 15.8958 15.8958C15.1447 16.6452 14.2628 17.2391 13.25 17.6775C12.2372 18.1158 11.1539 18.3344 10 18.3333Z"
                    fill="white"
                  />
                </svg>
              </span>
              {toggleInstructions && (
                <section>
                  <h6 className="text-xs text-secondary mt-1">
                    Follow given instruction to get the chat ID:
                  </h6>
                  <div className="font-normal">
                    <p className="text-xs text-secondary mt-1">
                      • Add @community_haus to your group and make it admin.
                    </p>
                    <p className="text-xs text-secondary mt-1">
                      {`• Add @SimpleID_Bot to your group. This would give you`}
                      <br />
                      {`group ID (eg: 4125558344) or supergroup ID (eg: -1001234567890).`}
                    </p>
                  </div>
                </section>
              )}
              <input
                name="communityChatId"
                type="text"
                value={formState.communityChatId}
                placeholder="Enter chat ID of your community"
                onChange={handleChange}
                required
                className="bg-tertiary font-normal w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
              />
            </label>
          )}
          {!requiresGroupCreation && (
            <label
              htmlFor="communityInviteLink"
              className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
            >
              Telegram Invite Link
              <input
                name="communityInviteLink"
                type="text"
                value={formState.communityInviteLink}
                placeholder="Enter telegram invite link of your community"
                onChange={handleChange}
                required
                className="bg-tertiary w-full font-normal text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
              />
            </label>
          )}
          <label
            htmlFor="description"
            className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
          >
            Short description about your community
            <textarea
              name="description"
              value={formState.description}
              placeholder="Tell about your community in a few words"
              onChange={handleChange}
              required
              className="bg-tertiary font-normal w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
            />
          </label>
          <label
            htmlFor="logo"
            className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white cursor-pointer"
          >
            Upload your logo
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="cursor-pointer"
            />
          </label>
          <p className="text-xs text-secondary mt-1">
            Keep the logo size under 250 x 150 px.
          </p>
          <div className="flex w-full justify-center">
            <button type="submit" className="btn-primary mt-10">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateModal;
