import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import ROUTES from "../../consts/routes";
import { useMutation } from "react-query";
import paypalService from "../../services/paypal-service";
import { PaypalRel } from "../../models/paypal";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";

const GlobalPayment = () => {
  const { token } = useParams();
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const [isPaypalMethod, setIsPaypalMethod] = useState(false);

  const { mutate: createOrder, isLoading: isCreatingOrder } = useMutation(
    (token: string) => paypalService.createOrder({ token }),
    {
      onSuccess: (response) => {
        const link = response.data.links.find(
          (link) => link.rel === PaypalRel.approve
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
            navigate(ROUTES.PAYPHONE.LINK_TOKEN(token || ""));
          }}
        />
      </div>
    </div>
  );
};

export default GlobalPayment;
