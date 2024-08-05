import { ReactNode, createContext } from "react";
import { PaymentGetDto } from "../../../models/payment";
import { TransactionGetDto } from "../../../models/transaction";

interface FormPDFContextProps {
  lastNames: string;
  names: string;
  signatureLink: string;
  cardFrontLink: string;
  cardBackLink: string;
  photoLink: string;
  payment?: PaymentGetDto;
  transactions?: TransactionGetDto[];
}

export const FormPdfContext = createContext<FormPDFContextProps>({
  lastNames: "",
  names: "",
  signatureLink: "",
  cardFrontLink: "",
  cardBackLink: "",
  photoLink: "",
  transactions: [],
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
  payment,
  transactions,
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
        payment,
        transactions,
      }}
    >
      {children}
    </FormPdfContext.Provider>
  );
};

export default FormPDFProvider;
