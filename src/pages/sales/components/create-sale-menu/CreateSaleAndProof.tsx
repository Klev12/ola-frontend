import { useContext } from "react";
import { SaleMenuContext } from "./CreateSaleMenu";
import { Button } from "primereact/button";
import { ContractIds, ENV } from "../../../../consts/const";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useMutation } from "react-query";
import saleService from "../../../../services/sale-service";
import {
  SaleCommercialCost,
  SaleMemberShip,
  SalePaymentMethod,
} from "../../../../models/sale";
import FileUploader from "../../../../components/FileUploader";
import { InputTextarea } from "primereact/inputtextarea";
import BackButton from "./BackButton";
import {
  translatedCommercialCost,
  translatedMembership,
  translatedPaymentMethod,
} from "../../../../consts/translations/sale-translations";

const CreateSaleAndProof = () => {
  const { sale, onQuerySuccess, setSale } = useContext(SaleMenuContext);

  const { mutate: createSaleCourse } = useMutation(saleService.createCourse, {
    onSuccess: () => {
      setSale({});
      if (onQuerySuccess) onQuerySuccess();
    },
  });
  const { mutate: createSaleService } = useMutation(saleService.createService, {
    onSuccess: () => {
      setSale({});
      if (onQuerySuccess) onQuerySuccess();
    },
  });

  return (
    <div>
      <div>
        <BackButton />
        <h2>{sale?.contract?.tag}</h2>
        {sale?.contract?.id === ContractIds.ola && (
          <>
            <h3>Servicio</h3>
            <div>{sale.service?.title}</div>
            <h4>Subservicio</h4>
            <div>{sale.serviceOption?.title}</div>
          </>
        )}
        {sale?.contract?.id === ContractIds.projectHub && (
          <>
            <h3>Capacitación</h3>
            <div>{sale.course?.title}</div>
          </>
        )}
        <h3>Modalidad</h3>
        <div>
          {
            translatedCommercialCost[
              sale?.commercialCost ?? SaleCommercialCost.commercial
            ]
          }
        </div>
        <h3>Membresía</h3>
        <div>
          {translatedMembership[sale?.membership ?? SaleMemberShip.none]}
        </div>

        <h3>Tipo de pago</h3>
        <div>
          {
            translatedPaymentMethod[
              sale?.paymentMethod ?? SalePaymentMethod.app
            ]
          }
        </div>
        <h3>Datos de pago</h3>
        <DataTable
          value={[
            {
              totalToPay: sale?.totalToPay,
              discount: sale?.discount,
              amount: sale?.amount,
            },
          ]}
        >
          <Column header="Valor normal" field="totalToPay" />
          <Column header="Descuento %" field="discount" />
          <Column
            header="Total"
            body={() => (
              <>
                {sale?.totalToPay && sale.discount
                  ? (
                      sale.totalToPay -
                      sale.totalToPay * (sale.discount / 100)
                    ).toFixed(2)
                  : sale?.totalToPay}
              </>
            )}
          />
          <Column header="Monto" field="amount" />
        </DataTable>
        <div style={{ fontWeight: "bold", marginTop: "20px" }}>
          Observaciones (opcional)
        </div>
        <InputTextarea
          style={{ width: "100%" }}
          defaultValue={sale?.observations}
          onChange={(e) => {
            setSale({ ...sale, observations: e.target.value });
          }}
        />
      </div>

      {[SalePaymentMethod.app].includes(
        sale?.paymentMethod as SalePaymentMethod
      ) ? (
        <Button
          style={{ marginTop: "20px" }}
          label="Crear venta"
          onClick={() => {
            if (sale?.contract?.id === ContractIds.ola) {
              createSaleService({
                totalToPay: sale.totalToPay as number,
                discount: ((sale.discount || 0) / 100) as number,
                amount: sale.amount as number,
                commercialCost: sale.commercialCost as SaleCommercialCost,
                contractId: sale.contract.id as number,
                membership: sale.membership as SaleMemberShip,
                paymentMethod: sale.paymentMethod as SalePaymentMethod,
                serviceId: sale.service?.id as number,
                serviceOptionId: sale.serviceOption?.id as number,
                observations: sale.observations,
              });
            } else {
              createSaleCourse({
                totalToPay: sale?.totalToPay as number,
                discount: ((sale?.discount || 0) / 100) as number,
                amount: sale?.amount as number,
                commercialCost: sale?.commercialCost as SaleCommercialCost,
                contractId: sale?.contract?.id as number,
                membership: sale?.membership as SaleMemberShip,
                paymentMethod: sale?.paymentMethod as SalePaymentMethod,
                courseId: sale?.course?.id as number,
                observations: sale?.observations,
                monthCount: sale?.monthCount as number,
              });
            }
          }}
        />
      ) : (
        <>
          <span style={{ fontWeight: "bold" }}>Comprobante</span>
          <FileUploader
            name="proof"
            defaultFiles={[]}
            uploadUrl={`${ENV.BACKEND_ROUTE}/forms/sales/${
              sale?.contract?.id === ContractIds.ola ? "service" : "course"
            }`}
            additionalPayload={{
              totalToPay: sale?.totalToPay as number,
              discount: ((sale?.discount || 0) / 100) as number,
              amount: sale?.amount as number,
              commercialCost: sale?.commercialCost as SaleCommercialCost,
              contractId: sale?.contract?.id as number,
              membership: sale?.membership,
              paymentMethod: sale?.paymentMethod as SalePaymentMethod,
              courseId: sale?.course?.id as number,
              serviceId: sale?.service?.id as number,
              serviceOptionId: sale?.serviceOption?.id as number,
            }}
            deleteUrl=""
            maxFiles={1}
            type="image"
            accept=".jpeg, .png"
            showSpecificDelete={false}
            onAfterUpload={() => {
              if (onQuerySuccess) onQuerySuccess();
            }}
          />
        </>
      )}
    </div>
  );
};

export default CreateSaleAndProof;
