import { create } from "zustand";
import { UserGetDto } from "../models/user";

interface GlobalState {
  user?: UserGetDto;
  setUser: (user: UserGetDto) => void;
  userFormId?: number | string;
  setUserFormId: (formId: number) => void;
  userFormNames: string | undefined;
  setUserFormNames: (names: string) => void;
  userFormLastNames: string | undefined;
  setUserFormLastNames: (lastNames: string) => void;
  userIdCard: string | undefined;
  setUserIdCard: (userIdCard: string) => void;
}

const useGlobalState = create<GlobalState>((set) => ({
  user: undefined,
  userFormId: undefined,
  userFormNames: undefined,
  userFormLastNames: undefined,
  userIdCard: undefined,
  setUserIdCard: (userIdCard) => {
    set({ userIdCard });
  },
  setUserFormNames: (names) => {
    set({ userFormNames: names });
  },
  setUserFormLastNames: (lastNames) => {
    set({ userFormLastNames: lastNames });
  },
  setUser: (user) => {
    set({ user });
  },
  setUserFormId: (id) => {
    set({ userFormId: id });
  },
}));

export default useGlobalState;
