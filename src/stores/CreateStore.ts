import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ICreateStore {
  twitterUrl: string | undefined;
  address: string | undefined;
  userName: string | undefined;
  telegramId: string | undefined;
  nameOfCommunity: string | undefined;
  description: string | undefined;
  updateTwitterUrl: (_twitterUrl: string) => void;
  updateAddress: (_address: string) => void;
  updateUserName: (_userName: string) => void;
  updateTelegramId: (_telegramId: string) => void;
  updateNameOfCommunity: (_nameOfCommunity: string) => void;
  updateDescription: (_description: string) => void;
}

export const useCreateStore = create<ICreateStore>()(
  devtools(
    persist(
      (set) => ({
        twitterUrl: undefined,
        address: undefined,
        userName: undefined,
        telegramId: undefined,
        nameOfCommunity: undefined,
        description: undefined,
        updateTwitterUrl: (_twitterUrl: string) =>
          set({ twitterUrl: _twitterUrl }),
        updateAddress: (_address: string) => set({ address: _address }),
        updateUserName: (_userName: string) => set({ userName: _userName }),
        updateTelegramId: (_telegramId: string) =>
          set({ telegramId: _telegramId }),
        updateNameOfCommunity: (_nameOfCommunity: string) =>
          set({ nameOfCommunity: _nameOfCommunity }),
        updateDescription: (_description: string) =>
          set({ description: _description }),
      }),
      {
        name: 'create-store',
        getStorage: () => localStorage,
      }
    )
  )
);
