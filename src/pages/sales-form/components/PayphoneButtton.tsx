import { useEffect, useRef } from "react";
import { ENV } from "../../../consts/const";

declare const payphone: any;

interface PayphoneButtonProps {
  amount: number;
  clientTransactionId: string;
}

const PayphoneButton = ({
  amount,
  clientTransactionId,
}: PayphoneButtonProps) => {
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
                  return paramlog;
                })
                .catch(function (paramlog2: string) {
                  console.log(paramlog2);
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

  return <div id="pp-button" ref={payphoneRef}></div>;
};

export default PayphoneButton;
