import { create } from "zustand";
import { UserItemStore, User } from "../types/types";

export const useUserStore = create<UserItemStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
