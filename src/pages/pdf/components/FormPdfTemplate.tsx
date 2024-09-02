import { useEffect, useRef } from "react";
import { FormGetDto } from "../../../models/forms";
import { FormScheme } from "../../../models/form-scheme";
import { ENV, ResourceAssets } from "../../../consts/const";
import { UserGetDto } from "../../../models/user";
import ContractHeader from "../../../components/ContractHeader";

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
  const doc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      if (onLoadHtml) onLoadHtml(doc.current?.innerHTML || "");
    }
  }, [onLoadHtml]);

  return (
    <div ref={doc}>
      <img src={ENV.ASSETS_ROUTE(ResourceAssets.logo)} width={100} />
      <h1 style={{ textAlign: "center" }}>Formulario de ingreso de personal</h1>
      {formScheme?.form_groups?.map((formGroup, index) => {
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
      })}
      <div style={{ breakInside: "avoid" }}>
        <h2>{formInfo?.contract.title}</h2>
        <ContractHeader formGroups={formScheme?.form_groups || []} />
        <p
          dangerouslySetInnerHTML={{ __html: formInfo?.contract.html || "" }}
        ></p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {authenticatedUser && (
            <img
              src={`${ENV.BACKEND_ROUTE}/multimedia/${
                authenticatedUser?.multimedias.find(
                  (file) => file.type === "signature"
                )?.hash
              }`}
              width={100}
            ></img>
          )}
        </div>
        <div style={{ breakInside: "avoid" }}>
          <h2>{formInfo?.term_and_condition.title}</h2>
          <ContractHeader formGroups={formScheme?.form_groups || []} />
          <p
            dangerouslySetInnerHTML={{
              __html: formInfo?.term_and_condition?.html || "",
            }}
          ></p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {authenticatedUser && (
              <img
                src={`${ENV.BACKEND_ROUTE}/multimedia/${
                  authenticatedUser?.multimedias.find(
                    (file) => file.type === "signature"
                  )?.hash
                }`}
                width={100}
              ></img>
            )}
          </div>
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
