import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface IAccountStore {
  name: string  | null | undefined;
  imageUrl: string  | null | undefined;
  updateName: (_name: string) => void;
  updateImageUrl: (_imageUrl: string) => void;
}

export const useAcountStore = create<IAccountStore>()(
  devtools(
    persist(
      (set) => ({
        name: null,
        imageUrl: null,
        updateName: (_name: string| null | undefined) => set({ name: _name }),
        updateImageUrl: (_imageUrl: string| null | undefined) => set({ imageUrl: _imageUrl }),
      }),
      {
        name: 'account-store',
        getStorage: () => localStorage,
      }
    )
  )
);