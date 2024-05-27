import { create } from "zustand";
import { UserGetDto } from "../models/user";

interface GlobalState {
  user?: UserGetDto;
}

const useGlobalState = create<GlobalState>(() => ({
  user: undefined,
}));

export default useGlobalState;
