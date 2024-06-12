import { ReactNode, createContext } from "react";

interface FormPDFContextProps {
  lastNames: string;
  names: string;
  signatureLink: string;
  cardFrontLink: string;
  cardBackLink: string;
}

export const FormPdfContext = createContext<FormPDFContextProps>({
  lastNames: "",
  names: "",
  signatureLink: "",
  cardFrontLink: "",
  cardBackLink: "",
});

interface FormPDFProviderProps extends FormPDFContextProps {
  children: ReactNode;
}

const FormPDFProvider = ({
  children,
  lastNames,
  names,
  signatureLink,
  cardBackLink,
  cardFrontLink,
}: FormPDFProviderProps) => {
  return (
    <FormPdfContext.Provider
      value={{ lastNames, names, signatureLink, cardFrontLink, cardBackLink }}
    >
      {children}
    </FormPdfContext.Provider>
  );
};

export default FormPDFProvider;
