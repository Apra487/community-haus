'use client;';
import React, { useState } from 'react';
import Image from 'next/image';

import Modal from './Modal';
import { useCreateStore, ICreateStore } from '@/stores';

type FormState = {
  username: string;
  telegramId: string;
  communityName: string;
  description: string;
  logo: File | null;
};

interface Props {
  closeActon: () => void;
}

const CreateModal: React.FC<Props> = ({ closeActon }) => {
  const {
    updateUserName,
    updateTelegramId,
    updateNameOfCommunity,
    updateDescription,
  } = useCreateStore((store: ICreateStore) => ({
    updateUserName: store.updateUserName,
    updateTelegramId: store.updateTelegramId,
    updateNameOfCommunity: store.updateNameOfCommunity,
    updateDescription: store.updateDescription,
  }));

  const [formState, setFormState] = useState<FormState>({
    username: '',
    telegramId: '',
    communityName: '',
    description: '',
    logo: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserName(formState.username);
    updateTelegramId(formState.telegramId);
    updateNameOfCommunity(formState.communityName);
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
          width={400}
          height={188}
        />
        <Image
          src="/assets/bgs/profile.svg"
          alt="cover-image"
          width={132}
          height={132}
          className="opacity-50 absolute left-[154px] top-[132px]"
        />
        <form onSubmit={handleSubmit} className=" mt-16">
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
              required
              className="bg-tertiary"
            />
          </label>
          <br />
          <label>
            Telegram ID:
            <input
              name="telegramId"
              type="text"
              value={formState.telegramId}
              onChange={handleChange}
              required
              className="bg-tertiary"
            />
          </label>
          <br />
          <label>
            Name of the Community:
            <input
              name="communityName"
              type="text"
              value={formState.communityName}
              onChange={handleChange}
              required
              className="bg-tertiary"
            />
          </label>
          <br />
          <label>
            Short Description of Community:
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
              className="bg-tertiary"
            />
          </label>
          <br />
          <label>
            Upload Logo:
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </label>
          <br />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateModal;
