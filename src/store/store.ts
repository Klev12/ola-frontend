import { create } from "zustand";
import { UserGetDto } from "../models/user";

interface GlobalState {
  user?: UserGetDto;
  numberOfNotifications: number | undefined;
  setNumberOfNotifications: (notifications: number) => void;

  setUser: (user: UserGetDto) => void;
  userFormId?: number | string;
  setUserFormId: (formId: number) => void;
  userFormNames: string | undefined;
  setUserFormNames: (names: string) => void;
  userFormLastNames: string | undefined;
  setUserFormLastNames: (lastNames: string) => void;
  userIdCard: string | undefined;
  setUserIdCard: (userIdCard: string) => void;
  isFormEditable: boolean | undefined;
  setIsFormEditable: (state: boolean) => void;
  normalModeCheckForm: boolean | undefined;
  setNormalModeCheckForm: (state: boolean) => void;
}

const useGlobalState = create<GlobalState>((set) => ({
  user: undefined,
  userFormId: undefined,
  userFormNames: undefined,
  userFormLastNames: undefined,
  userIdCard: undefined,
  isFormEditable: false,
  numberOfNotifications: 0,
  normalModeCheckForm: false,
  setNormalModeCheckForm: (normalModeCheckForm) => {
    set({ normalModeCheckForm });
  },
  setNumberOfNotifications: (notifications) => {
    set({ numberOfNotifications: notifications });
  },
  setIsFormEditable: (state) => {
    set({ isFormEditable: state });
  },
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
