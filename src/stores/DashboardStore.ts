import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type CommunityDataType = {
  username: string;
  telegramID: string;
  communityName: string;
  communityDescription: string;
  chatID: string;
  users: string[];
  criteria: {
    common: string;
    rate: string;
    legendary: string;
    ultimate: string;
    droplets: string;
    dropsNumber: string;
  };
  twitterUrl: string;
  contractAddress: string;
  _id: string;
};

export interface IDashboardStore {
  communityData: CommunityDataType | undefined;
  updateCommunityData: (_communityData: CommunityDataType) => void;
}

export const useDashboardStore = create<IDashboardStore>()(
  devtools(
    persist(
      (set) => ({
        communityData: undefined,
        updateCommunityData: (_communityData: CommunityDataType) =>
          set({ communityData: _communityData }),
      }),
      {
        name: 'create-store',
        getStorage: () => localStorage,
      }
    )
  )
);
