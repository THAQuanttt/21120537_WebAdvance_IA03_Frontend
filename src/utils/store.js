// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            email: "",
            setEmail: (email) => set({ email }),
        }),
        {
            name: "auth-storage", // Tên key trong localStorage
            getStorage: () => localStorage, // Sử dụng localStorage
        }
    )
);
