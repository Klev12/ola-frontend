import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import pdfService from "../../../services/pdf-service";
import FormPdfTemplate from "./FormPdfTemplate";
import { FormGetDto } from "../../../models/forms";
import { FormScheme } from "../../../models/form-scheme";
import { UserGetDto } from "../../../models/user";
import SalesFormTemplate from "./SalesFormTemplate";

interface FormPdfProps {
  formInfo?: FormGetDto;
  formScheme?: FormScheme;
  user?: UserGetDto;
  type: "user-form" | "normal-form" | "sales-form";
}

const FormPdf = ({ formInfo, formScheme, user, type }: FormPdfProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [html, setHtml] = useState("");
  const { mutate: createPdf } = useMutation(pdfService.create, {
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    },
  });

  useEffect(() => {
    if (html) createPdf(html);
  }, [html, createPdf]);

  return (
    <>
      <div style={{ display: "none" }}>
        {type === "user-form" && (
          <FormPdfTemplate
            formInfo={formInfo}
            formScheme={formScheme}
            authenticatedUser={user}
            onLoadHtml={(html) => {
              setHtml(html);
            }}
          />
        )}
        {type === "sales-form" && (
          <SalesFormTemplate
            formInfo={formInfo}
            formScheme={formScheme}
            authenticatedUser={user}
            onLoadHtml={(html) => {
              setHtml(html);
            }}
          />
        )}
      </div>
      {pdfUrl ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={pdfUrl}
          ></iframe>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            Cargando pdf...
            <ProgressSpinner />
          </div>
        </div>
      )}
    </>
  );
};

export default FormPdf;
