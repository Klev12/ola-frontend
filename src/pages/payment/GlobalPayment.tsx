import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import ROUTES from "../../consts/routes";
import { useMutation, useQuery } from "react-query";
import paypalService from "../../services/paypal-service";
import { PaypalRel } from "../../models/paypal";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";
import ReloadPageButton from "../../core/components/ReloadPageButton";

import { TransactionStatus } from "../../models/transaction";
import transactionService from "../../services/transaction-service";

const GlobalPayment = () => {
  const { token } = useParams();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const [isPaypalMethod, setIsPaypalMethod] = useState(false);

  const { data: transactionStatusData } = useQuery({
    queryFn: () =>
      transactionService
        .getStatusByToken({ token: String(token) })
        .then((res) => res.data),
    retry: 1,
    queryKey: ["transaction-status-data", token],
  });

  const { mutate: createOrder, isLoading: isCreatingOrder } = useMutation(
    (token: string) => paypalService.createOrder({ token }),
    {
      onSuccess: (response) => {
        const link = response.data.links.find(
          (link) => link.rel === PaypalRel.payerAction
        )?.href;

        window.open(link, "");
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data.error?.message,
        });
      },
    }
  );

  useEffect(() => {
    if (
      transactionStatusData?.transaction.statusCode ===
      TransactionStatus.accepted
    ) {
      navigate(ROUTES.PAYMENT.INVOICE(transactionStatusData.transaction.token));
    }
  }, [transactionStatusData, navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Pago</h1>
      <ReloadPageButton />
      <Toast ref={toast} />
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          disabled={isCreatingOrder}
          loading={isCreatingOrder}
          label="Pagar con paypal"
          onClick={() => {
            const isConfirm = confirm(
              "¿Desea pagar con paypal?, será dirigido a la página del pago"
            );
            if (isConfirm && token) {
              console.log(token);
              setIsPaypalMethod(true);
              createOrder(token);
            }
          }}
        />
        <Button
          disabled={isCreatingOrder || isPaypalMethod}
          loading={isCreatingOrder}
          label="Pagar con payphone"
          onClick={() => {
            window.open(ROUTES.PAYPHONE.LINK_TOKEN(token || ""), "_blank");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default GlobalPayment;
