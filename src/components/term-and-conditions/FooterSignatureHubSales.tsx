import { CSSProperties } from "react";
import { FormDetails, FormGetDto } from "../../models/forms";
import { MetadataUser, UserGetDto } from "../../models/user";
import { ENV } from "../../consts/const";

interface FooterSignatureSalesStaticProps {
  formInfo?: FormGetDto;
  sellerDetails?: UserGetDto;
  sellerMetadata?: MetadataUser;
  formDetails?: FormDetails;
  style?: CSSProperties;
}

const FooterSignatureHubSales = ({
  formInfo,
  formDetails,
  style,
}: FooterSignatureSalesStaticProps) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "space-around",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: "130px 50px 50px 50px",
          textAlign: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div style={{ height: "130px" }} />
        <h2 style={{ fontSize: "17px" }}>Gerente General</h2>
        <p>Christian Adrian Guapisaca Cabrera</p>
        <div> 0105862817001</div>
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
        <img
          src={`${ENV.BACKEND_ROUTE}/multimedia/${formInfo?.signature}`}
          height={130}
        />

        <h5 style={{ fontSize: "17px" }}>Cliente</h5>
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

export default FooterSignatureHubSales;
