import { Navigate, useParams } from "react-router";
import PayphoneButton from "./components/PayphoneButtton";
import { useQuery } from "react-query";
import { getFormByToken } from "../../services/forms-service";

import { TransactionStatus } from "../../models/transaction";
import ROUTES from "../../consts/routes";
import ReloadPageButton from "../../core/components/ReloadPageButton";

const Payphonelink = () => {
  const { token } = useParams();

  const { data: formData, isError } = useQuery({
    queryFn: () =>
      getFormByToken({ token: token as string }).then((res) => res.data),
    queryKey: ["form-data-payment-data", token],
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
        margin: "20px",
      }}
    >
      <h2
        style={{
          fontSize: 50,
          fontFamily: "roboto",
          color: "var(--main-color)",
        }}
      >
        Ola Transacción
      </h2>

      <div style={{ fontFamily: "roboto" }}>
        Nota: si hay un error al momento de realizar el pago, por favor recargar
        la página.
      </div>
      <ReloadPageButton />
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
