import { Navigate, useParams } from "react-router";
import PayphoneButton from "./components/PayphoneButtton";
import { useQuery } from "react-query";
import { getFormByToken } from "../../services/forms-service";

import { TransactionStatus } from "../../models/transaction";
import ROUTES from "../../consts/routes";

const Payphonelink = () => {
  const { token } = useParams();

  const { data: formData, isError } = useQuery({
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
    return (
      <Navigate
        to={
          ROUTES.PAYPHONE.ME +
          `?id=${formData.transaction.transactionId}&clientTransactionId=${formData.transaction.clientTransactionId}`
        }
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2.5rem",
      }}
    >
      <h1 style={{ fontSize: 50 }}>Ola Transacion</h1>
      <p>
        Nota: si hay un error al momento de realizar el pago, por favor recargar
        la página.
      </p>
      <div style={{}}>
        <PayphoneButton
          amount={Number(formData.transaction.amount)}
          clientTransactionId={formData.transaction.clientTransactionId}
        />
      </div>
    </div>
  );
};

export default Payphonelink;
