import { ReactNode, createContext } from "react";
import { ResultPutDto } from "../../../models/result";

export interface SalesContextProps {
  formData?: {
    id: number;
    hash: string;
    results: ResultPutDto[];
  };
}

interface SalesProviderProps extends SalesContextProps {
  children: ReactNode;
}

export const SalesContext = createContext<SalesContextProps>({
  formData: {
    id: 0,
    hash: "",
    results: [],
  },
});

const SalesProvider = (context: SalesProviderProps) => {
  return (
    <SalesContext.Provider value={context}>
      {context.children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
