import { useEffect, useRef } from "react";
import { FormScheme } from "../../../models/form-scheme";
import { TestGetDto } from "../../../models/test";
import { UserGetDto } from "../../../models/user";

interface TestFormTemplateProps {
  onLoadHtml?: (html: string) => void;
  test?: TestGetDto;
  formScheme?: FormScheme;
  authenticatedUser?: UserGetDto;
}

const TestFormTemplate = ({
  onLoadHtml,
  test,
  formScheme,
  authenticatedUser,
}: TestFormTemplateProps) => {
  const doc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      if (onLoadHtml) onLoadHtml(doc.current?.innerHTML || "");
    }
  }, [onLoadHtml]);

  return (
    <div ref={doc}>
      <h1>{test?.title}</h1>
      {formScheme?.form_groups.map((formGroup) => {
        return (
          <div key={formGroup.id}>
            {formGroup.fields.map((field) => {
              return (
                <div key={field.id}>
                  <h2>{field.label}</h2>
                  {field.metadata.options?.map((option, index) => {
                    return <div key={index}>{option.label}</div>;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TestFormTemplate;
