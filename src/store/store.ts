import { create } from "zustand";
import { UserGetDto } from "../models/user";

interface GlobalState {
  user?: UserGetDto;
  userFormId?: number | string;
  setUserFormId: (formId: number) => void;
}

const useGlobalState = create<GlobalState>((set) => ({
  user: undefined,
  userFormId: undefined,
  setUserFormId: (id) => {
    set({ userFormId: id });
  },
}));

export default useGlobalState;
