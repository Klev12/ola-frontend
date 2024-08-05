import { useParams } from "react-router";
import PayphoneButton from "./components/PayphoneButtton";
import { useQuery } from "react-query";
import { getFormByToken } from "../../services/forms-service";
import ROUTES from "../../consts/routes";
import { TransactionStatus } from "../../models/transaction";

const Payphonelink = () => {
  const { token } = useParams();

  const {
    data: formData,
    isLoading: isFormLoading,
    isError,
  } = useQuery({
    queryFn: () =>
      getFormByToken({ token: token as string }).then((res) => res.data),
    queryKey: ["form-data", token],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <div>invalid link</div>;
  }

  if (!formData?.transaction.amount) {
    return;
  }

  if (formData.transaction.statusCode === TransactionStatus.accepted) {
    return <div>Esta transacción ya ha sido aceptada</div>;
  }

  return (
    <div>
      <h2>Ola pago</h2>
      <p>
        Nota: si hay un error al hacer click en el botón del pago, por favor
        recargar la página
      </p>
      <PayphoneButton
        responseUrl={`${window.location}${ROUTES.PAYPHONE.LINK_TOKEN(
          formData.transaction.token
        )}`}
        amount={Number(formData.transaction.amount)}
        clientTransactionId={formData.transaction.clientTransactionId}
      />
    </div>
  );
};

export default Payphonelink;
