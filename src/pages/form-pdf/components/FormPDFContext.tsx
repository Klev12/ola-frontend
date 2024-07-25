import { ReactNode, createContext } from "react";

interface FormPDFContextProps {
  lastNames: string;
  names: string;
  signatureLink: string;
  cardFrontLink: string;
  cardBackLink: string;
  photoLink: string;
}

export const FormPdfContext = createContext<FormPDFContextProps>({
  lastNames: "",
  names: "",
  signatureLink: "",
  cardFrontLink: "",
  cardBackLink: "",
  photoLink: "",
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
  photoLink,
}: FormPDFProviderProps) => {
  return (
    <FormPdfContext.Provider
      value={{
        lastNames,
        names,
        signatureLink,
        cardFrontLink,
        cardBackLink,
        photoLink,
      }}
    >
      {children}
    </FormPdfContext.Provider>
  );
};

export default FormPDFProvider;
