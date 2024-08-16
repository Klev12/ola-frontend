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
      "https://pay.payphonetodoesposible.com/api/button/js?appId=Ijkyvm2RUuUXi94KwTlg";
    script.type = "module";
    script.onload = () => {
      if (payphone) {
        payphone
          .Button({
            //token obtenido desde la consola de developer
            token:
              "NATMcpyG4GThKdSeAZxWUnNTv54kbwq5Dbh3O26RputFUNfQ0K6Ot_FlFbuUovPPoXO4DibtqAIBIwHBocqmSofpQFD1bPQkLb9AB9sfZRAYuvpFlxtzVrtTbiG2tz5ivwlfl1uHoT_PsAbJ6K79xY3oeBwP9sIpo8bv-F6RO6qn4dr_4Hq7Nxzyk16KEXIk--zyQJQry7wRolBo9ffce4RufDSEHvhh9UFs3zl664l-AEzoi6uol52is9I3t46WaePQtfuupn-iIV0VlQAyH_kWFr2-2sBoXpOCQwSpEi08TJ_Uw59qt0imbkXc8YEjH6M1mLnhzy6qm-6WzS7OyKJWkFAk6sz9s4H49ZN5p0lfxRe008byjRJYnut2zO8_dJf5xhQ5ufZcdiIMo3H1o-78eUfkI_nrUusw_GGtDiDq97Zss0ObyYGbXtWW5zsJysXjLdVjE-dC5XJ-yw9MwoYrnnjYvNAVVA1nwVfsXPLTrZ5ARmQGDUEiN70cl5ptaOAdiGoJS2AyXZWR3weVlIES-ma5OfMMtA1X3jMw50__JTTNRMRKoF-cRR2bbFfUk55E0YFB7ZtTWx__aZWQpFUsXLUR5-2ym-zPb1QwTRVEzynKMIgQmLfh0xj5Za4OYZlap861oOSkTGaidtIjxtFX439X4AiW1LgOJr3DuIGbjRwCJZh9J4",

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
