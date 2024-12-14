import { useEffect, useRef, useState } from "react";
import { ENV } from "../../../consts/const";
import { ProgressSpinner } from "primereact/progressspinner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const payphone: any;

interface PayphoneButtonProps {
  amount: number;
  clientTransactionId?: string;
}

const PayphoneButton = ({
  amount,
  clientTransactionId,
}: PayphoneButtonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const payphoneRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://pay.payphonetodoesposible.com/api/button/js?appId=${ENV.PAYPHONE_ID}`;
    script.type = "module";
    script.onload = () => {
      if (payphone) {
        payphone
          .Button({
            //token obtenido desde la consola de developer
            token: ENV.PAYPHONE_TOKEN,

            //PARÁMETROS DE CONFIGURACIÓN
            btnHorizontal: true,
            btnCard: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            createOrder: function (actions: any) {
              //Se ingresan los datos de la transaccion ej. monto, impuestos, etc

              return actions
                .prepare({
                  amount: amount * 100,
                  amountWithoutTax: amount * 100,
                  currency: "USD",
                  clientTransactionId,
                  lang: "es",
                })
                .then(function (paramlog: string) {
                  setIsLoading(false);
                  return paramlog;
                })
                .catch(function (paramlog2: string) {
                  setIsLoading(false);
                  return paramlog2;
                });
            },

            onComplete: function () {},
          })
          .render("#pp-button");
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {isLoading && <ProgressSpinner />}
      <div id="pp-button" ref={payphoneRef}></div>
    </>
  );
};

export default PayphoneButton;
