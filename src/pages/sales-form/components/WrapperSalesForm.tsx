import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";
import { UserFormGetDto } from "../../../models/user-form";
import { useQuery } from "react-query";
import { generateFormByHash } from "../../../services/forms-service";
import Timer from "../../../components/Timer";

interface SalesFormContextProps {
  form?: UserFormGetDto;
  isFormLoading?: boolean;
  errorMessage?: string;
}

export const SalesFormContext = createContext<SalesFormContextProps>({
  form: undefined,
  isFormLoading: undefined,
});

const WrapperSalesForm = () => {
  const { hash } = useParams();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { data: formData, isLoading } = useQuery({
    queryFn: () => generateFormByHash(hash as string).then((res) => res.data),
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
        value={{ form: formData, isFormLoading: isLoading, errorMessage }}
      >
        <h2>{errorMessage && errorMessage}</h2>
        {!errorMessage && <Timer />}
        <Outlet />
      </SalesFormContext.Provider>
    </div>
  );
};

export default WrapperSalesForm;
