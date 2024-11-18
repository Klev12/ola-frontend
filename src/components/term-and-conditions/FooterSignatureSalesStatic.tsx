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

const FooterSignatureSalesStatic = ({
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
        <img src={""} height={130} />
        <h5 style={{ fontSize: "17px" }}>Empresa</h5>
        <p>OLA business</p>
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
        <img
          src={`${window.location.origin}/api/v1/multimedia/${formInfo?.signature}`}
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

export default FooterSignatureSalesStatic;
