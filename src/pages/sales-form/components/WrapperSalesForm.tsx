import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";
import { UserFormGetDto } from "../../../models/user-form";
import { useQuery } from "react-query";
import {
  generateFormByHash,
  getFormById,
} from "../../../services/forms-service";
import Timer from "../../../components/Timer";

interface SalesFormContextProps {
  form?: UserFormGetDto;
  isFormLoading?: boolean;
  errorMessage?: string;
  hashMode?: boolean;
}

export const SalesFormContext = createContext<SalesFormContextProps>({
  form: undefined,
  isFormLoading: undefined,
  hashMode: true,
});

interface WrapperSalesFormProps {
  hashMode?: boolean;
}

const WrapperSalesForm = ({ hashMode = true }: WrapperSalesFormProps) => {
  const { hash } = useParams();
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { data: formData, isLoading } = useQuery({
    queryFn: () =>
      hashMode
        ? generateFormByHash(hash as string).then((res) => res.data)
        : getFormById(Number(id)).then((res) => res.data),
    queryKey: ["sales"],
    refetchOnWindowFocus: false,
    retry: 1,
    onError: () => {
      setErrorMessage("El link ya ha sido usado, por favor usa otro.");
    },
  });

  return (
    <div>
      <SalesFormContext.Provider
        value={{
          form: formData,
          isFormLoading: isLoading,
          errorMessage,
          hashMode,
        }}
      >
        <h2>{errorMessage && errorMessage}</h2>
        {!errorMessage && hashMode && <Timer />}
        <Outlet />
      </SalesFormContext.Provider>
    </div>
  );
};

export default WrapperSalesForm;
