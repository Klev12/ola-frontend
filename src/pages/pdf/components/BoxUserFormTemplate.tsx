import { Field } from "../../../models/form-scheme";

interface BoxUserFormTemplateProps {
  fields: Field[];
}

const BoxUserFormTemplate = ({ fields }: BoxUserFormTemplateProps) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      {fields.map((field) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{field.label}:</span>
            <div>{field.results?.[0]?.response?.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BoxUserFormTemplate;
