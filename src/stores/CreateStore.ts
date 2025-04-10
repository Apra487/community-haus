import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ICreateStore {
  twitterUrl: string | undefined;
  address: string | undefined;
  userName: string | undefined;
  telegramId: string | undefined;
  nameOfCommunity: string | undefined;
  communityType: 'group' | 'supergroup' | 'channel';
  communityChatId: string | undefined;
  communityInviteLink: string | undefined;
  description: string | undefined;
  avatar: File | undefined;
  updateTwitterUrl: (_twitterUrl: string) => void;
  updateAddress: (_address: string) => void;
  updateUserName: (_userName: string) => void;
  updateTelegramId: (_telegramId: string) => void;
  updateNameOfCommunity: (_nameOfCommunity: string) => void;
  updateCommunityType: (
    _typeOfCommunit: 'group' | 'supergroup' | 'channel'
  ) => void;
  updateCommunityChatId: (_communityChatId: string) => void;
  updateCommunityInviteLink: (_communityInviteLink: string) => void;
  updateDescription: (_description: string) => void;
  updateAvatar: (_avatar: File | undefined) => void;
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
        communityType: 'supergroup',
        communityChatId: undefined,
        communityInviteLink: undefined,
        description: undefined,
        avatar: undefined,
        updateTwitterUrl: (_twitterUrl: string) =>
          set({ twitterUrl: _twitterUrl }),
        updateAddress: (_address: string) => set({ address: _address }),
        updateUserName: (_userName: string) => set({ userName: _userName }),
        updateTelegramId: (_telegramId: string) =>
          set({ telegramId: _telegramId }),
        updateNameOfCommunity: (_nameOfCommunity: string) =>
          set({ nameOfCommunity: _nameOfCommunity }),
        updateCommunityType: (
          _typeOfCommunit: 'group' | 'supergroup' | 'channel'
        ) => set({ communityType: _typeOfCommunit }),
        updateCommunityChatId: (_communityChatId: string) =>
          set({ communityChatId: _communityChatId }),
        updateCommunityInviteLink: (_communityInviteLink: string) =>
          set({ communityInviteLink: _communityInviteLink }),
        updateDescription: (_description: string) =>
          set({ description: _description }),
        updateAvatar: (_avatar: File | undefined) => set({ avatar: _avatar }),
      }),
      {
        name: 'create-store',
        getStorage: () => localStorage,
      }
    )
  )
);
