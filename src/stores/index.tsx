import { UserLoggedIn } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


type AppStoreState = {
  userLoggedIn: UserLoggedIn | null;
};

type AppStoreAction = {
  setLogin: (u: UserLoggedIn) => void;
  logout: () => void;
};

const defaultAppStore: AppStoreState = {
  userLoggedIn: null,
};

export const useAppStore = create<AppStoreState & AppStoreAction>()(
  persist(
    (set, get) => ({
      ...defaultAppStore,
    setLogin: (u: UserLoggedIn) => {
      set({ userLoggedIn: u });
    },
    logout: () => {
      set({userLoggedIn: null});
    },
    }),
    {
      name: 'zustand-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 
    }
  )
)