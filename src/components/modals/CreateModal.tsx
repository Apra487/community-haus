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
              className="mt-3 flex flex-col justify-center items-start text-sm font-semibold leading-6 text-white"
            >
              Group Chat ID
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
