import { CSSProperties } from "react";
import { FormDetails } from "../../models/forms";

interface FooterSignaturesStaticProps {
  formDetails?: FormDetails;
  clientSignatureUrl?: string;
  style?: CSSProperties;
}

const FooterSignaturesStatic = ({
  formDetails,
  clientSignatureUrl,
  style,
}: FooterSignaturesStaticProps) => {
  return (
    <div style={{ ...style, display: "flex", justifyContent: "space-around" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "130px 50px 50px 50px",
          textAlign: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <img src="" height={130} />
        <h5>EL EMPLEADOR</h5>
        <p>Christian Adrián Guapisaca Cabrera</p>
        <div>C.C: 010586281-7</div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "130px 50px 50px 50px",
          textAlign: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <img src={clientSignatureUrl} height={130} />

        <h5>EL TRABAJADOR</h5>
        <p>{`${formDetails?.userNames} ${formDetails?.userLastNames}`}</p>
        <div>
          C.C:{" "}
          {formDetails?.cardId?.replace(/.$/, (lastChar) => {
            return `-${lastChar}`;
          })}
        </div>
      </div>
    </div>
  );
};

export default FooterSignaturesStatic;
