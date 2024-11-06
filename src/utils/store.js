// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
      (set) => ({
        token: "",
        refreshToken: "",
        setToken: (token) => set({ token }),
        setRefreshToken: (refreshToken) => set({ refreshToken })
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  );