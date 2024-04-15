'use client;';
import React, { useState } from 'react';
import Image from 'next/image';

import Modal from './Modal';
import { useCreateStore, ICreateStore } from '@/stores';

type FormState = {
  username: string;
  telegramId: string;
  communityName: string;
  communityChatId: string;
  description: string;
  logo: File | null;
};

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
    updateCommunityChatId,
    updateDescription,
  } = useCreateStore((store: ICreateStore) => ({
    updateUserName: store.updateUserName,
    updateTelegramId: store.updateTelegramId,
    updateNameOfCommunity: store.updateNameOfCommunity,
    updateCommunityChatId: store.updateCommunityChatId,
    updateDescription: store.updateDescription,
  }));

  const [formState, setFormState] = useState<FormState>({
    username: '',
    telegramId: '',
    communityName: '',
    communityChatId: '',
    description: '',
    logo: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserName(formState.username);
    updateTelegramId(formState.telegramId);
    updateNameOfCommunity(formState.communityName);
    updateCommunityChatId(formState.communityChatId);
    updateDescription(formState.description);
    console.log(formState);
    closeActon();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFormState({ ...formState, logo: files[0] });
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
        <Image
          src="/assets/bgs/profile.svg"
          alt="cover-image"
          width={132}
          height={132}
          className="opacity-50 absolute left-[174px] top-[132px]"
        />
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
              className="bg-tertiary w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
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
              className="bg-tertiary w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
            />
          </label>
          {!requiresGroupCreation && (
            <label
              htmlFor="communityChatId"
              className="mt-3 relative flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
            >
              Group Chat ID
              <span className="absolute top-[2px] left-[100px] cursor-pointer">
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
              <input
                name="communityChatId"
                type="text"
                value={formState.communityChatId}
                placeholder="Enter chat ID of your community"
                onChange={handleChange}
                required
                className="bg-tertiary w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
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
              className="bg-tertiary w-full text-sm py-3 px-4 rounded-2xl focus:outline-none mt-2"
            />
          </label>
          {/* <label
            htmlFor="logo"
            className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
          >
            Upload your logo
            <input
              className=""
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          <p className="text-xs text-secondary mt-1">
            Keep the logo size under 250 x 150 px.
          </p> */}
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
