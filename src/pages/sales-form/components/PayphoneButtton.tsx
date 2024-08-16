import { useEffect, useRef } from "react";

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
    script.src =
      "https://pay.payphonetodoesposible.com/api/button/js?appId=6bCU1wkY50ef4o4pq0uZlg";
    script.type = "module";
    script.onload = () => {
      if (payphone) {
        payphone
          .Button({
            //token obtenido desde la consola de developer
            token:
              "NATMcpyG4GThKdSeAZxWUnNTv54kbwq5Dbh3O26RputFUNfQ0K6Ot_FlFbuUovPPoXO4DibtqAIBIwHBocqmSofpQFD1bPQkLb9AB9sfZRAYuvpFlxtzVrtTbiG2tz5ivwlfl1uHoT_PsAbJ6K79xY3oeBwP9sIpo8bv-F6RO6qn4dr_4Hq7Nxzyk16KEXIk--zyQJQry7wRolBo9ffce4RufDSEHvhh9UFs3zl664l-AEzoi6uol52is9I3t46WaePQtfuupn-iIV0VlQAyH_kWFr2-2sBoXpOCQwSpEi08TJ_Uw59qt0imbkXc8YEjH6M1mLnhzy6qm-6WzS7OyKJWkFA",

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
