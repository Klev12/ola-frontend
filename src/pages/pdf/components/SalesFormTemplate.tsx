import { useEffect, useMemo, useRef } from "react";
import { UserGetDto } from "../../../models/user";
import { FormScheme } from "../../../models/form-scheme";
import useFormDetails from "../../../hooks/useFormDetails";
import HeaderDate from "./sales/HeaderDate";
import BoxTableSales from "./sales/BoxTableSales";
import { ENV, ResourceAssets } from "../../../consts/const";
import formatDateEs from "../../../utils/format-date-es";
import FooterSignatureSalesStatic from "../../../components/term-and-conditions/FooterSignatureSalesStatic";
import { useQuery } from "react-query";
import { findUserById } from "../../../services/user-service";
import replaceKeyWords from "../../../utils/replace-key-words";
import {
  SaleCommercialCost,
  SaleGetDto,
  SaleMemberShip,
} from "../../../models/sale";
import { FormMetadata } from "./FormPdf";
import { ServiceType } from "../../../models/service";
import {
  translatedCommercialCost,
  translatedMembership,
} from "../../../consts/translations/sale-translations";
import AdditionalDataSale from "./sales/AdditionalDataSale";

interface SalesFormTemplateProps {
  onLoadHtml?: (html: string) => void;
  saleInfo?: SaleGetDto;
  formScheme?: FormScheme;
  authenticatedUser?: UserGetDto;
  metadata?: FormMetadata;
}

const SalesFormTemplate = ({
  onLoadHtml,
  saleInfo,
  formScheme,
  metadata,
}: SalesFormTemplateProps) => {
  const doc = useRef<HTMLDivElement>(null);

  const formDetails = useFormDetails({ formInfo: saleInfo, formScheme });

  const { data: userData } = useQuery({
    queryFn: () =>
      findUserById(saleInfo?.user_id as number).then((res) => res.data),
    queryKey: ["user-data", saleInfo?.user_id],
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
        <div
          style={{ position: "absolute", left: 0, top: 0, fontWeight: "bold" }}
        >
          Anexo 1
        </div>
        <h2>Planilla de registro</h2>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tipo de servicio</span>
              <span>{saleInfo?.serviceTitle}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                {saleInfo?.serviceType === ServiceType.normal
                  ? "Subservicio"
                  : "Plan"}
              </span>
              <span>{saleInfo?.serviceOptionTitle}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Membresía</span>
              <span>
                {translatedMembership[saleInfo?.membership as SaleMemberShip]}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Valor normal</span>
              <span>${saleInfo?.saleTotalToPay}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Modalidad</span>
              <span>
                {
                  translatedCommercialCost[
                    saleInfo?.commercialCost as SaleCommercialCost
                  ]
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      <AdditionalDataSale saleInfo={saleInfo} />
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            fontWeight: "bold",
            backgroundColor: "var(--main-color)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
            Descuento
          </div>

          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            Total
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            Monto
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",

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
            {saleInfo?.saleTotalToPay}
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {saleInfo?.saleDiscount && saleInfo.saleDiscount * 100}%
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {saleInfo?.saleTotalToPay
              ? saleInfo.saleTotalToPay -
                saleInfo.saleTotalToPay * (saleInfo.saleDiscount || 0)
              : 0}{" "}
          </div>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              padding: "5px 0",
              borderCollapse: "collapse",
            }}
          >
            {saleInfo?.saleAmount}
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
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Factura
        </h2>
        {metadata?.transactions?.map((transaction) => {
          return (
            <div
              key={transaction.id}
              style={{
                width: "500px",
                marginTop: "80px",
                marginLeft: "50px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Fecha:</span>
                <span style={{ paddingLeft: "120px" }}>
                  {" "}
                  {formatDateEs(transaction.createdAt)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Nombre de negocio:</span>
                <span style={{ paddingRight: "195px" }}>
                  {transaction.businessName}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Cliente:</span>
                <span style={{ paddingRight: "180px" }}>
                  {" "}
                  {transaction.costumerName}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  Identificador de transacción:
                </span>
                <span>{transaction.clientTransactionId}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tienda:</span>
                <span> {transaction.storeName}</span>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Monto:</span>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  ${transaction.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ breakInside: "avoid" }}>
        <h2 style={{ textAlign: "center" }}>
          {replaceKeyWords({
            text: metadata?.contract?.title || "",
            formDetails,
          })}
        </h2>

        <div
          dangerouslySetInnerHTML={{
            __html: replaceKeyWords({
              text: metadata?.contract?.html || "",
              formDetails,
            }),
          }}
        ></div>

        <FooterSignatureSalesStatic
          formDetails={formDetails}
          formInfo={saleInfo}
          sellerDetails={userData?.user}
          sellerMetadata={userData?.metadata}
        />
      </div>
      {/* <div style={{ breakInside: "avoid" }}>
        <h2>{saleInfo?.term_and_condition?.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceKeyWords({
              text: saleInfo?.term_and_condition.html || "",
              formDetails,
            }),
          }}
        ></div>
        <FooterSignatureSalesStatic
          formDetails={formDetails}
          saleInfo={saleInfo}
          sellerDetails={userData?.user}
          sellerMetadata={userData?.metadata}
        />
      </div> */}
    </div>
  );
};

export default SalesFormTemplate;
