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
  superUsername: string | undefined;
  communityData: CommunityDataType[] | undefined;
  updateCommunityData: (_communityData: CommunityDataType[]) => Promise<void>;
}

export const useDashboardStore = create<IDashboardStore>()(
  devtools(
    persist(
      (set) => ({
        superUsername: undefined,
        communityData: undefined,
        updateSuperUsername: async (_superUsername: string) =>
          set({ superUsername: _superUsername }),
        updateCommunityData: async (_communityData: CommunityDataType[]) =>
          set({ communityData: _communityData }),
      }),
      {
        name: 'dashboard-store',
        getStorage: () => localStorage,
      }
    )
  )
);
