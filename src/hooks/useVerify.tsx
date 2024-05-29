import { useQuery } from "react-query";
import { authenticate } from "../services/auth-service";

const useVerify = () => {
  const { data, isLoading } = useQuery({
    queryFn: authenticate,
    queryKey: ["user"],
  });

  if (!isLoading) {
    return <h1>Autenticando...</h1>;
  }
};

export default useVerify;
