import { useEffect, useMemo, useRef } from "react";
import { Field, FormScheme } from "../../../models/form-scheme";
import {
  SaleCommercialCost,
  SaleGetDto,
  SaleMemberShip,
} from "../../../models/sale";
import BoxTableSales from "./sales/BoxTableSales";
import formatDateEs from "../../../utils/format-date-es";
import useFormDetails from "../../../hooks/useFormDetails";
import {
  translatedCommercialCost,
  translatedMembership,
} from "../../../consts/translations/sale-translations";

import { FormMetadata } from "./FormPdf";
import replaceKeyWords from "../../../utils/replace-key-words";
import FooterSignatureSalesStatic from "../../../components/term-and-conditions/FooterSignatureSalesStatic";

interface HubFormTemplateProps {
  saleInfo?: SaleGetDto;
  formScheme?: FormScheme;
  onLoadHtml?: (html: string) => void;
  metadata?: FormMetadata;
}

const HubFormTemplate = ({
  saleInfo,
  formScheme,
  onLoadHtml,
  metadata,
}: HubFormTemplateProps) => {
  const doc = useRef<HTMLDivElement>(null);

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

  const formDetails = useFormDetails({ formInfo: saleInfo, formScheme });

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
        <div>
          <span style={{ fontWeight: "bold" }}>Consultor:</span>{" "}
          <span>{saleInfo?.userCode}</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            alignItems: "center",
          }}
        >
          <div></div>
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
          <span style={{ fontWeight: "bold" }}>DATOS</span>
        </div>
        <BoxTableSales
          fields={[
            {
              label: "Fecha",
              results: [
                {
                  response: { value: formatDateEs(saleInfo?.createdAt || "") },
                },
              ],
            } as Field,
          ]}
        />
        <BoxTableSales fields={allFields.slice(0, 1)} />
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
          <p style={{ fontSize: "10px" }}>{saleInfo?.observations}</p>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold" }}>Capacitación</span>
            <span>{saleInfo?.courseTitle}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Membresía</span>
            <span>
              {translatedMembership[saleInfo?.membership as SaleMemberShip]}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Número de meses</span>
            <span>{saleInfo?.monthCount}</span>
          </div>
          <div style={{ color: "var(--main-color)", fontWeight: "bold" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Valor normal</span>
              <span>${saleInfo?.saleTotalToPay} USD</span>
            </div>
            {saleInfo?.commercialCost !== SaleCommercialCost.commercial && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Descuento</span>
                <span>
                  {saleInfo?.saleDiscount ? saleInfo.saleDiscount * 100 : 0} %
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Modalidad</span>
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
      <div style={{ marginTop: "10px" }}>
        {allFields.slice(7, 9).map((field, index) => {
          const [result] = field.results;
          if (!result) return;
          return (
            <div key={index}>
              <div style={{ fontWeight: "bold", margin: "10px 0" }}>
                {field.label}
              </div>
              <div style={{ marginLeft: "10px" }}>
                {field.results.map((result, index) => (
                  <div key={index}>{result?.response?.value}</div>
                ))}
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
          formInfo={saleInfo}
          formDetails={formDetails}
        />
      </div>
    </div>
  );
};

export default HubFormTemplate;
