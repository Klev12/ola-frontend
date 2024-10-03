import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAllContracts } from "../../../services/contract-service";
import { ContractGetDto, ContractType } from "../../../models/contract";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { SalePaymentMethod } from "../../../models/sale";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import saleService from "../../../services/sale-service";
import FileUploader from "../../../components/FileUploader";
import { ENV } from "../../../consts/const";

interface CreateSaleMenuProps {
  onSuccessCreated?: () => void;
}

const CreateSaleMenu = ({ onSuccessCreated }: CreateSaleMenuProps) => {
  const [selectedContract, setSelectedContract] = useState<ContractGetDto>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<SalePaymentMethod>(SalePaymentMethod.app);

  const [amount, setAmount] = useState(1);
  const [discount, setDiscount] = useState(0);

  const { data: contractsData } = useQuery({
    queryFn: () =>
      getAllContracts({ type: ContractType.sales }).then((res) => res.data),
    onSuccess: (data) => {
      const [firstElement] = data.contracts;
      setSelectedContract(firstElement);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: createSale, isLoading: isCreatingSale } = useMutation(
    saleService.create,
    {
      onSuccess: onSuccessCreated,
    }
  );

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

  useEffect(() => {
    if (discount > 100) {
      setDiscount(100);
      return;
    }
  }, [discount]);

  useEffect(() => {
    if (amount <= 0 || !amount) {
      setAmount(1);
    }
  }, [amount]);

  return (
    <div>
      <form
        action=""
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={(e) => {
          e.preventDefault();
          createSale({
            amount,
            discount: discount / 100,
            contractId: selectedContract?.id as number,
            paymentMethod: selectedPaymentMethod,
          });
        }}
      >
        <span style={{ fontWeight: "bold" }}>Tipo de formulario</span>
        {contractsData?.contracts.map((contract) => {
          return (
            <div style={{ display: "flex", gap: "10px" }} key={contract.id}>
              <span>{contract.title}</span>
              <Checkbox
                checked={selectedContract?.id === contract.id}
                onClick={() => {
                  setSelectedContract(contract);
                }}
              />
            </div>
          );
        })}

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

        <span style={{ fontWeight: "bold" }}>Monto</span>
        <InputNumber
          mode="decimal"
          value={amount}
          minFractionDigits={2}
          name="amount"
          required
          min={1}
          onChange={(e) => {
            setAmount(e.value || 1);
          }}
        />
        <span style={{ fontWeight: "bold" }}>Descuento %</span>

        <InputNumber
          mode="decimal"
          minFractionDigits={2}
          name="discount"
          required
          min={0}
          max={100}
          value={discount}
          onChange={(e) => {
            setDiscount(e.value || 0);
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
