import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAllContracts } from "../../../services/contract-service";
import { ContractGetDto, ContractType } from "../../../models/contract";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import {
  SaleCommercialCost,
  SaleMemberShip,
  SalePaymentMethod,
} from "../../../models/sale";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import saleService from "../../../services/sale-service";
import FileUploader from "../../../components/FileUploader";
import { ContractIds, ENV } from "../../../consts/const";
import {
  translatedCommercialCost,
  translatedMembership,
} from "../../../consts/translations/sale-translations";
import SelectCourseList from "./SelectCourseList";
import { InputTextarea } from "primereact/inputtextarea";
import { CourseGetDto } from "../../../models/course";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";
import SelectServiceList from "./SelectServiceList";

interface CreateSaleMenuProps {
  onSuccessCreated?: () => void;
}

const translatedPaymentMethodOptions: {
  [key in SalePaymentMethod]: { label: string; value: string };
} = {
  [SalePaymentMethod.transference]: {
    label: "transferencia",
    value: SalePaymentMethod.transference,
  },
  [SalePaymentMethod.POS]: {
    label: "POS",
    value: SalePaymentMethod.POS,
  },
  [SalePaymentMethod.app]: {
    label: "aplicación",
    value: SalePaymentMethod.app,
  },
};

const CreateSaleMenu = ({ onSuccessCreated }: CreateSaleMenuProps) => {
  const toast = useRef<Toast>(null);

  const [selectedContract, setSelectedContract] = useState<ContractGetDto>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<SalePaymentMethod>(SalePaymentMethod.app);
  const [selectedCommercialCost, setSelectedCommercialCost] = useState(
    SaleCommercialCost.commercial
  );
  const [selectedMembership, setSelectedMembership] = useState<SaleMemberShip>(
    SaleMemberShip.none
  );
  const [selectedCourse, setSelectedCourse] = useState<CourseGetDto>();

  const [total, setTotal] = useState(0);
  const [totalToPay, setTotalToPay] = useState(1);
  const [amount, setAmount] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [observations, setObservations] = useState("");

  const { data: contractsData } = useQuery({
    queryFn: () =>
      getAllContracts({ type: ContractType.sales }).then((res) => res.data),
    onSuccess: (data) => {
      const [firstElement] = data.contracts;
      setSelectedContract(firstElement);
    },
    refetchOnWindowFocus: false,
    queryKey: ["contracts"],
  });

  const { mutate: createSaleCourse, isLoading: isCreatingSale } = useMutation(
    saleService.createCourse,
    {
      onSuccess: onSuccessCreated,
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error.response?.data.error?.message;
        toast.current?.show({
          summary: "Error",
          severity: "error",
          detail: message,
        });
      },
    }
  );

  useEffect(() => {
    if (discount > 50) {
      setDiscount(50);
      return;
    }
  }, [discount]);

  useEffect(() => {
    if (totalToPay <= 0 || !totalToPay) {
      setTotalToPay(1);
    }
  }, [totalToPay]);

  useEffect(() => {
    setTotal(totalToPay - totalToPay * (discount / 100));
  }, [totalToPay, discount]);

  useEffect(() => {
    if (amount > total) {
      setAmount(total);
      return;
    }

    if (total < amount) {
      setAmount(total);
    }
  }, [amount, total]);

  return (
    <div>
      <Toast ref={toast} />
      <form
        action=""
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedContract?.id === ContractIds.projectHub) {
            createSaleCourse({
              amount,
              discount: discount / 100,
              contractId: selectedContract?.id as number,
              paymentMethod: selectedPaymentMethod,
              commercialCost: selectedCommercialCost,
              membership: selectedMembership,
              totalToPay,
              observations,
              courseId: selectedCourse?.id as number,
            });
            return;
          }
        }}
      >
        <span style={{ fontWeight: "bold" }}>Tipo de formulario</span>
        {contractsData?.contracts.map((contract) => {
          return (
            <div style={{ display: "flex", gap: "10px" }} key={contract.id}>
              <span>{contract.tag}</span>
              <Checkbox
                checked={selectedContract?.id === contract.id}
                onClick={() => {
                  setSelectedContract(contract);
                }}
              />
            </div>
          );
        })}

        {selectedContract?.id === ContractIds.projectHub && (
          <>
            <span style={{ fontWeight: "bold" }}>Capacitaciones</span>
            <SelectCourseList
              onSelect={(course) => setSelectedCourse(course)}
            />
          </>
        )}

        {selectedContract?.id === ContractIds.projectPolitics && (
          <>
            <span style={{ fontWeight: "bold" }}>Servicios</span>
            <SelectServiceList />
          </>
        )}

        <span style={{ fontWeight: "bold" }}>Método de pago</span>
        <Dropdown
          value={selectedPaymentMethod}
          required
          options={Object.values(SalePaymentMethod).map(
            (paymentMethod) => translatedPaymentMethodOptions[paymentMethod]
          )}
          onChange={(e) => {
            setSelectedPaymentMethod(e.value);
          }}
        />
        <span style={{ fontWeight: "bold" }}>Costo comercial</span>
        <Dropdown
          value={selectedCommercialCost}
          options={Object.entries(translatedCommercialCost).map(
            ([key, value]) => {
              return { value: key, label: value };
            }
          )}
          onChange={(e) => {
            setSelectedCommercialCost(e.value);
            setDiscount(0);
          }}
        />

        <span style={{ fontWeight: "bold" }}>Membresía</span>
        <Dropdown
          value={selectedMembership}
          options={Object.entries(translatedMembership).map(([key, value]) => {
            return { value: key, label: value };
          })}
          onChange={(e) => {
            setSelectedMembership(e.value);
          }}
        />

        <span style={{ fontWeight: "bold" }}>Observaciones (opcional)</span>
        <InputTextarea
          placeholder="descripción"
          onChange={(e) => setObservations(e.target.value)}
        />

        <span style={{ fontWeight: "bold" }}>
          Total a pagar (valor referencial)
        </span>
        <InputNumber
          mode="decimal"
          value={totalToPay}
          minFractionDigits={2}
          name="totalToPay"
          required
          min={1}
          onChange={(e) => {
            setTotalToPay(e.value || 1);
          }}
        />
        {selectedCommercialCost !== SaleCommercialCost.commercial && (
          <>
            <span style={{ fontWeight: "bold" }}>Descuento %</span>
            <InputNumber
              mode="decimal"
              minFractionDigits={2}
              name="discount"
              required
              min={0}
              max={50}
              value={discount}
              onChange={(e) => {
                setDiscount(e.value || 0);
              }}
            />
            <span style={{ fontWeight: "bold" }}>Total</span>
            <div>
              {totalToPay} - {discount}% ={" "}
              <span style={{ fontWeight: "bold" }}>{total.toFixed(2)}</span>
            </div>
          </>
        )}

        <span style={{ fontWeight: "bold" }}>Monto a pagar</span>
        <InputNumber
          mode="decimal"
          min={0}
          max={totalToPay}
          minFractionDigits={2}
          value={amount}
          onChange={(e) => {
            setAmount(e.value || 1);
          }}
        />

        {[SalePaymentMethod.POS, SalePaymentMethod.transference].includes(
          selectedPaymentMethod
        ) && (
          <>
            <span style={{ fontWeight: "bold" }}>Comprobante</span>
            <FileUploader
              defaultFiles={[]}
              additionalPayload={{
                amount,
                discount: discount / 100,
                contractId: selectedContract?.id,
                paymentMethod: selectedPaymentMethod,
              }}
              uploadUrl={`${ENV.BACKEND_ROUTE}/forms/sales`}
              deleteUrl=""
              name="proof"
              maxFiles={1}
              type="image"
              onAfterUpload={onSuccessCreated}
              accept=".png, .jpeg"
              showSpecificDelete={false}
              showGeneralDelete={true}
            />
          </>
        )}

        {![SalePaymentMethod.POS, SalePaymentMethod.transference].includes(
          selectedPaymentMethod
        ) && (
          <Button
            style={{ marginTop: "20px" }}
            label="Crear formulario"
            loading={isCreatingSale}
            disabled={isCreatingSale}
          />
        )}
      </form>
    </div>
  );
};

export default CreateSaleMenu;
