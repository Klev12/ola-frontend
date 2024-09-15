import { useEffect, useRef } from "react";
import { FormScheme } from "../../../models/form-scheme";
import { TestGetDto } from "../../../models/test";
import { UserGetDto } from "../../../models/user";
import { GradeGetDto, GradeResponseOption } from "../../../models/grade";
import formatDateEs from "../../../utils/format-date-es";

interface TestFormTemplateProps {
  onLoadHtml?: (html: string) => void;
  test?: TestGetDto & { grade?: GradeGetDto };
  formScheme?: FormScheme;
  authenticatedUser?: UserGetDto;
}

const TestFormTemplate = ({
  onLoadHtml,
  test,
  formScheme,
}: TestFormTemplateProps) => {
  const doc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      if (onLoadHtml) onLoadHtml(doc.current?.innerHTML || "");
    }
  }, [onLoadHtml]);

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
      <h1>{test?.title}</h1>
      <div>Creado el {formatDateEs(test?.createdAt || "")}</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <span>
          Resuelto por:{" "}
          <span style={{ fontWeight: "bold" }}>{test?.grade?.userName}</span>
        </span>
        <span>
          Código de usuario:{" "}
          <span style={{ fontWeight: "bold" }}>{test?.grade?.userCode}</span>
        </span>
      </div>
      {formScheme?.form_groups.map((formGroup) => {
        return (
          <div key={formGroup.id}>
            {formGroup.fields.map((field) => {
              return (
                <div key={field.id}>
                  <h2>{field.label}</h2>
                  {field.metadata.options?.map((option, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <span>{option.label}</span>
                        <span>
                          {field.gradeResponses
                            ?.flatMap((response) => response.value)
                            .includes(option.value as GradeResponseOption) ? (
                            <span
                              style={{
                                display: "flex",
                                gap: "20px",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "7px",
                                  height: "7px",
                                  border: "1px solid black",
                                  borderRadius: "25px",
                                  backgroundColor:
                                    option.correct === "true" ? "green" : "red",
                                }}
                              ></div>
                              {option.correct === "true" ? (
                                <span>
                                  Correcto +
                                  {parseFloat(String(test?.score)) / 10}
                                  pts.
                                </span>
                              ) : (
                                <span>Incorrecto</span>
                              )}
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
      <div>
        <h2>Nota final</h2>
        <div>
          <span>
            {test?.grade?.score} / {test?.score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestFormTemplate;
