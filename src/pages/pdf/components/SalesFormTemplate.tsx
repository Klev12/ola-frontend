import { useEffect, useMemo, useRef } from "react";
import { UserGetDto } from "../../../models/user";
import { FormScheme } from "../../../models/form-scheme";
import { FormGetDto } from "../../../models/forms";
import useFormDetails from "../../../hooks/useFormDetails";
import HeaderDate from "./sales/HeaderDate";
import BoxTableSales from "./sales/BoxTableSales";
import { ENV, ResourceAssets } from "../../../consts/const";
import formatDateEs from "../../../utils/format-date-es";
import FooterSignatureSalesStatic from "../../../components/term-and-conditions/FooterSignatureSalesStatic";
import { useQuery } from "react-query";
import { findUserById } from "../../../services/user-service";
import replaceKeyWords from "../../../utils/replace-key-words";
import SalesFormContractStatic from "../../../components/term-and-conditions/SalesFormContractStatic";

interface SalesFormTemplateProps {
  onLoadHtml?: (html: string) => void;
  formInfo?: FormGetDto;
  formScheme?: FormScheme;
  authenticatedUser?: UserGetDto;
}

const SalesFormTemplate = ({
  onLoadHtml,
  formInfo,
  formScheme,
}: SalesFormTemplateProps) => {
  const doc = useRef<HTMLDivElement>(null);

  const formDetails = useFormDetails({ formInfo, formScheme });

  const { data: userData } = useQuery({
    queryFn: () =>
      findUserById(formInfo?.user_id as number).then((res) => res.data),
    queryKey: ["user-data", formInfo?.user_id],
  });

  useEffect(() => {
    if (document.readyState === "complete") {
      if (onLoadHtml) onLoadHtml(doc.current?.innerHTML || "");
    }
  }, [onLoadHtml]);

  const allFields = useMemo(() => {
    return (
      formScheme?.form_groups.flatMap((formGroup) => formGroup.fields).flat() ||
      []
    );
  }, [formScheme]);

  return (
    <div ref={doc}>
      <style>
        {`
        html {
            -webkit-print-color-adjust: exact;
        }
        html{
            --main-color: #9170ad;
        }
        `}
      </style>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              position: "relative",
              left: "250px",
              padding: "5px 10px",
              border: "1px solid var(--main-color)",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Contrato No.</span>{" "}
            <span style={{ color: "red" }}>{formInfo?.code}</span>
          </div>
        </div>
        <h2>Información referencial</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            alignItems: "center",
          }}
        >
          <div></div>
          <HeaderDate formDetails={formDetails} />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <img
              src={ENV.ASSETS_ROUTE(ResourceAssets.logo)}
              style={{ width: "120px" }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          borderLeft: "1px solid black",
          borderTop: "1px solid black",
          borderRight: "1px solid black",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "5px",
            backgroundColor: "var(--main-color)",
            color: "white",
            textAlign: "center",
            borderBottom: "1px solid black",
          }}
        >
          <span style={{ fontWeight: "bold" }}>DATOS PERSONALES</span>
        </div>
        <BoxTableSales fields={allFields.slice(1, 3)} />
        <BoxTableSales fields={allFields.slice(3, 5)} />
        <BoxTableSales fields={allFields.slice(5, 7)} fullWidth={true} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <span style={{ fontWeight: "bold" }}>
            Observaciones y comentarios
          </span>
          <p style={{ fontSize: "10px" }}>{formDetails.observations}</p>
        </div>
        <div>
          <div style={{ color: "var(--main-color)", fontWeight: "bold" }}>
            <h4>Inversión {formInfo?.contract?.title} más Iva.</h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Proyecto</span>
              <span>${formInfo?.contract?.project} USD</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Mensualidades 9, de</span>
              <span>${formInfo?.contract?.monthly_payment}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Suscripción</span>
              <span>${formInfo?.contract?.suscription}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Costo comercial</span>
            <span>{formDetails.agreement}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            fontWeight: "bold",
            backgroundColor: "var(--main-color)",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            color: "white",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            Total a pagar
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            Valor Suscripción
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            N° Cuotas
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            Valor Mensual
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            Saldo para pagar
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",

            fontSize: "12px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {formInfo?.payment?.total}
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {formInfo?.payment?.subscription_value}
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {formInfo?.payment?.number_fees}
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {formInfo?.payment?.month_value}
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {formInfo?.payment?.remaining_total}
          </div>
        </div>
      </div>
      <div
        style={{
          borderLeft: "1px solid black",
          borderTop: "1px solid black",
          borderRight: "1px solid black",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            padding: "5px",
            backgroundColor: "var(--main-color)",
            color: "white",
            textAlign: "center",
            borderBottom: "1px solid black",
          }}
        >
          <span style={{ fontWeight: "bold" }}>DATOS DEL NEGOCIO</span>
        </div>
        <BoxTableSales fields={allFields.slice(7, 9)} />
        <BoxTableSales fields={allFields.slice(9, 11)} />
        <BoxTableSales fields={allFields.slice(11, 13)} />
        <BoxTableSales fields={allFields.slice(13, 15)} />
        <BoxTableSales fields={allFields.slice(15, 16)} />
        <BoxTableSales fields={allFields.slice(16, 18)} />
        <BoxTableSales fields={allFields.slice(18, 20)} />
      </div>
      <div style={{ breakInside: "avoid", pageBreakBefore: "always" }}>
        <h2>Transacción</h2>
        {formInfo?.transactions.map((transaction) => {
          return (
            <div key={transaction.id} style={{ width: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Nombre de negocio:</span>
                <span>{transaction.businessName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Cliente:</span>
                <span> {transaction.costumerName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Monto:</span>
                <span> {transaction.amount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>
                  Identificador de transacción:
                </span>
                <span> {transaction.clientTransactionId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Tienda:</span>
                <span> {transaction.storeName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Fecha:</span>
                <span> {formatDateEs(transaction.createdAt)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ breakInside: "avoid" }}>
        <h2>
          {replaceKeyWords({
            text: formInfo?.contract?.title || "",
            formDetails,
          })}
        </h2>
        <SalesFormContractStatic formDetails={formDetails}>
          <div
            dangerouslySetInnerHTML={{
              __html: replaceKeyWords({
                text: formInfo?.contract.html || "",
                formDetails,
              }),
            }}
          ></div>
        </SalesFormContractStatic>
        <FooterSignatureSalesStatic
          formDetails={formDetails}
          formInfo={formInfo}
          sellerDetails={userData?.user}
          sellerMetadata={userData?.metadata}
        />
      </div>
      <div style={{ breakInside: "avoid" }}>
        <h2>{formInfo?.term_and_condition?.title}</h2>
        <SalesFormContractStatic formDetails={formDetails}>
          <div
            dangerouslySetInnerHTML={{
              __html: replaceKeyWords({
                text: formInfo?.term_and_condition.html || "",
                formDetails,
              }),
            }}
          ></div>
        </SalesFormContractStatic>
        <FooterSignatureSalesStatic
          formDetails={formDetails}
          formInfo={formInfo}
          sellerDetails={userData?.user}
          sellerMetadata={userData?.metadata}
        />
      </div>
    </div>
  );
};

export default SalesFormTemplate;
