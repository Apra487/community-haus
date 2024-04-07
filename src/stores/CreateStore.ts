import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ICreateStore {
  twitterUrl: string | undefined;
  address: string | undefined;
  updateTwitterUrl: (_twitterUrl: string) => void;
  updateAddress: (_address: string) => void;
}

export const useCreateStore = create<ICreateStore>()(
  devtools(
    persist(
      (set) => ({
        twitterUrl: undefined,
        address: undefined,
        updateTwitterUrl: (_twitterUrl: string) =>
          set({ twitterUrl: _twitterUrl }),
        updateAddress: (_address: string) => set({ address: _address }),
      }),
      {
        name: 'create-store',
        getStorage: () => localStorage,
      }
    )
  )
);
