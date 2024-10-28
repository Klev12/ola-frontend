import { translatedPaymentMethod } from "../../../../consts/translations/sale-translations";
import { SaleGetDto, SalePaymentMethod } from "../../../../models/sale";

interface AdditionalDataSaleProps {
  saleInfo?: SaleGetDto;
}

const AdditionalDataSale = ({ saleInfo }: AdditionalDataSaleProps) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          margin: "20px 0",
        }}
      >
        <div>
          <div>
            <span style={{ fontWeight: "bold" }}>Tipo de pago:</span>{" "}
            {
              translatedPaymentMethod[
                saleInfo?.paymentMethod as SalePaymentMethod
              ]
            }
          </div>
        </div>
        <div>
          <div>
            <span style={{ fontWeight: "bold" }}>Consultor:</span>{" "}
            {saleInfo?.userCode}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalDataSale;
