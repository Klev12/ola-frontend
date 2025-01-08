import { FormDetails } from "../../../../models/forms";

interface HeaderDateProps {
  formDetails?: FormDetails;
}

const HeaderDate = ({ formDetails }: HeaderDateProps) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gridAutoRows: "30px 30px",
          width: "400px",
          height: "fit-content",
          border: "1px solid black",
          gap: "1px",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            backgroundColor: "var(--main-color)",
            color: "white",
          }}
        >
          CIUDAD
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            backgroundColor: "var(--main-color)",
            color: "white",
          }}
        >
          DÍA
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            backgroundColor: "var(--main-color)",
            color: "white",
          }}
        >
          MES
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "var(--main-color)",
            color: "white",
          }}
        >
          AÑO
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {formDetails?.city}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {new Date(formDetails?.createdAt || "").getDate()}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {new Date(formDetails?.createdAt || "").getMonth() + 1}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {new Date(formDetails?.createdAt || "").getFullYear()}
        </div>
      </div>
    </>
  );
};

export default HeaderDate;
