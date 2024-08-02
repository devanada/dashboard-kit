import { type StateCreator } from "zustand";

import { LoginPayload } from "@/utils/types/auth";

export interface AuthStore {
  userData: LoginPayload | null;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  userData: JSON.parse(localStorage.getItem("userData") ?? "null"),
  addAuth: (data) =>
    set(() => {
      localStorage.setItem("userData", JSON.stringify(data));

      return {
        userData: data,
      };
    }),
  resetAuth: () =>
    set(() => {
      localStorage.clear();

      return { userData: null };
    }),
});
