import { ReactNode, createContext } from "react";

interface FormPDFContextProps {
  lastNames: string;
  names: string;
  signatureLink: string;
}

export const FormPdfContext = createContext({
  lastNames: "",
  names: "",
  signatureLink: "",
});

interface FormPDFProviderProps extends FormPDFContextProps {
  children: ReactNode;
}

const FormPDFProvider = ({
  children,
  lastNames,
  names,
  signatureLink,
}: FormPDFProviderProps) => {
  return (
    <FormPdfContext.Provider value={{ lastNames, names, signatureLink }}>
      {children}
    </FormPdfContext.Provider>
  );
};

export default FormPDFProvider;
