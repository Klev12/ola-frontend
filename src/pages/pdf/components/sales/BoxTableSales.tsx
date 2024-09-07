import { Field } from "../../../../models/form-scheme";

interface BoxTableSalesProps {
  fields: Field[];
  fullWidth?: boolean;
}

const BoxTableSales = ({ fields, fullWidth = false }: BoxTableSalesProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: !fullWidth ? `repeat(${fields.length}, 1fr)` : "",
        gridTemplateRows: fullWidth ? `repeat(${fields.length}, 1fr)` : "",
        height: "fit-content",
        alignItems: "center",
        gap: !fullWidth ? "20px" : "",
        borderBottom: !fullWidth ? "1px solid black" : "",
      }}
    >
      {fields.map((field) => {
        return (
          <div
            key={field.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: fullWidth ? "1px solid black" : "",
              padding: "5px",
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

export default BoxTableSales;
