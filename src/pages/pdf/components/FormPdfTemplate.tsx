import { useEffect, useMemo, useRef } from "react";
import { FormGetDto } from "../../../models/forms";
import { FormScheme } from "../../../models/form-scheme";
import { ENV, ResourceAssets } from "../../../consts/const";
import { UserGetDto } from "../../../models/user";
import UserFormContractStatic from "../../../components/term-and-conditions/UserFormContractStatic";
import useFormDetails from "../../../hooks/useFormDetails";
import FooterSignaturesStatic from "../../../components/term-and-conditions/FooterSignaturesStatic";
import ConfidentialityContractStatic from "../../../components/term-and-conditions/ConfidentialityContractStatic";
import formatDateEs from "../../../utils/format-date-es";
import BoxUserFormTemplate from "./BoxUserFormTemplate";

interface FormPdfTemplateProps {
  onLoadHtml?: (html: string) => void;
  formInfo?: FormGetDto;
  formScheme?: FormScheme;
  authenticatedUser?: UserGetDto;
}

const FormPdfTemplate = ({
  onLoadHtml,
  formScheme,
  formInfo,
  authenticatedUser,
}: FormPdfTemplateProps) => {
  const formDetails = useFormDetails({ formInfo, formScheme });

  const doc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      if (onLoadHtml) onLoadHtml(doc.current?.innerHTML || "");
    }
  }, [onLoadHtml]);

  const userSignatureUrl = useMemo(() => {
    const hash = authenticatedUser?.multimedias.find(
      (file) => file.type === "signature"
    )?.hash;
    return `${ENV.BACKEND_ROUTE}/multimedia/${hash}`;
  }, [authenticatedUser]);

  return (
    <div ref={doc}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={ENV.ASSETS_ROUTE(ResourceAssets.logo)} width={100} />
      </div>
      <h1 style={{ textAlign: "center" }}>Formulario de ingreso de personal</h1>
      <div>
        <div style={{ display: "flex", alignContent: "end", gap: "30px" }}>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Cargo Solicitado:{" "}
          </span>
          <span>{formDetails.area}</span>
        </div>
        <div style={{ display: "flex", alignContent: "end", gap: "30px" }}>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>Fecha: </span>
          <span>{formatDateEs(formDetails.createdAt || "")}</span>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          marginTop: "20px",
        }}
      >
        <div style={{ padding: "10px", border: "1px solid black" }}>
          <span style={{ fontWeight: "bold" }}>Nombres y apellidos</span>
          <div>{`${formDetails.userNames} ${formDetails.userLastNames}`}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <BoxUserFormTemplate
            fields={
              formScheme?.form_groups
                .flatMap((field) => field.fields)
                .slice(2, 5) || []
            }
          />
          <BoxUserFormTemplate
            fields={
              formScheme?.form_groups
                .flatMap((field) => field.fields)
                .slice(6, 9) || []
            }
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <BoxUserFormTemplate
            fields={
              formScheme?.form_groups
                .flatMap((field) => field.fields)
                .slice(10, 13) || []
            }
          />
          <BoxUserFormTemplate
            fields={
              formScheme?.form_groups
                .flatMap((field) => field.fields)
                .slice(14, 17) || []
            }
          />
        </div>
        <BoxUserFormTemplate
          fields={
            formScheme?.form_groups
              .flatMap((field) => field.fields)
              .slice(18, 21) || []
          }
        />
        <BoxUserFormTemplate
          fields={
            formScheme?.form_groups
              .flatMap((field) => field.fields)
              .slice(22, 27) || []
          }
        />
        <BoxUserFormTemplate
          fields={
            formScheme?.form_groups
              .flatMap((field) => field.fields)
              .slice(27, 30) || []
          }
        />

        <BoxUserFormTemplate
          fields={
            formScheme?.form_groups
              .flatMap((field) => field.fields)
              .slice(30, 32) || []
          }
        />
      </div>
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>
        {formScheme?.form_groups
          .flatMap((field) => field.fields)
          .slice(32, 33)
          .map((field) => {
            return <>{field.label}</>;
          })}
      </div>
      {/* {formScheme?.form_groups?.map((formGroup, index) => {
        return (
          <div
            key={formGroup.id}
            style={index === 0 ? {} : { breakInside: "avoid" }}
          >
            <h2>{formGroup.label}</h2>
            {formGroup.fields.map((field) => {
              return (
                <div
                  key={field.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid purple",
                    padding: "20px 0",
                  }}
                >
                  <span>{field.label}:</span>
                  <div>
                    {field.results
                      .map((result) => result.response.value)
                      .join(", ")}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })} */}
      <div style={{ breakInside: "avoid" }}>
        <h2>{formInfo?.contract.title}</h2>
        <UserFormContractStatic formDetails={formDetails}>
          <div
            dangerouslySetInnerHTML={{ __html: formInfo?.contract.html || "" }}
          ></div>
        </UserFormContractStatic>
        <FooterSignaturesStatic
          style={{ marginTop: "50px" }}
          formDetails={formDetails}
          clientSignatureUrl={userSignatureUrl}
        />

        <div style={{ breakInside: "avoid" }}>
          <h2>{formInfo?.term_and_condition.title}</h2>
          <ConfidentialityContractStatic formDetails={formDetails}>
            <div
              dangerouslySetInnerHTML={{
                __html: formInfo?.term_and_condition?.html || "",
              }}
            ></div>
          </ConfidentialityContractStatic>
          <FooterSignaturesStatic
            style={{ marginTop: "50px", breakInside: "avoid" }}
            formDetails={formDetails}
            clientSignatureUrl={userSignatureUrl}
          />

          {authenticatedUser && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {authenticatedUser.multimedias
                .filter((file) => file.type === "card_id")
                .map((cardId) => {
                  return (
                    <img
                      key={cardId.id}
                      src={`${ENV.BACKEND_ROUTE}/multimedia/${cardId.hash}`}
                      width={200}
                    ></img>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPdfTemplate;
