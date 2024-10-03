import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { useMutation } from "react-query";
import { verifySalesFormByFormId } from "../../../services/sales-service";
import { useContext, useRef, useState } from "react";
import { SalesFormContext } from "./WrapperSalesForm";
import { Toast } from "primereact/toast";
import { TransactionGetDto } from "../../../models/transaction";
import TransactionsList from "../../sales/components/TransactionsList";
import { AxiosError } from "axios";

const ConfirmSale = () => {
  const { formInfo, hashMode } = useContext(SalesFormContext);
  const toast = useRef<Toast>(null);
  const dialog = useToggle();
  const isLoadingVerification = useToggle();
  const isFormBlocked = useToggle(formInfo?.block);

  const [pendingTransaction, setPedingTransaction] = useState<
    TransactionGetDto | undefined
  >(undefined);

  const { mutate: verifySalesFormByFormIdMutate } = useMutation(
    verifySalesFormByFormId,
    {
      onSuccess: (response) => {
        isLoadingVerification.setFalse();
        toast.current?.show({
          summary: "La venta ha sido confirmada",
          severity: "success",
        });
        isFormBlocked.setTrue();
        setPedingTransaction(response.data.transaction);
      },
      onError: (error: AxiosError<{ error?: { message?: string } }>) => {
        const message = error?.response?.data?.error?.message;
        isLoadingVerification.setFalse();
        toast.current?.show({
          summary: "Error",
          severity: "error",
          detail: message,
        });
      },
    }
  );

  return (
    <div>
      <Toast ref={toast} />

      <Button
        disabled={formInfo?.block}
        label="Confirmar venta"
        onClick={() => dialog.setTrue()}
      />

      <Dialog
        closable={!isLoadingVerification.value}
        style={{ width: "90vw", maxWidth: "400px" }}
        visible={dialog.value}
        draggable={false}
        onHide={() => {
          dialog.setFalse();
        }}
        header="Confirmación de Venta"
        footer={
          <div>
            <Button
              style={{ color: "purple" }}
              label="Cancelar"
              onClick={() => dialog.setFalse()}
              className="p-button-text"
            />
            <Button
              label="Aceptar"
              loading={isLoadingVerification.value}
              onClick={() => {
                isLoadingVerification.setTrue();
                verifySalesFormByFormIdMutate({
                  formId: formInfo?.id as number,
                  hash: hashMode ? (formInfo?.hash as string) : undefined,
                });
              }}
              className="p-button-danger"
            />
          </div>
        }
      >
        <p>
          Si aceptas confirmar esta venta no podrás modificar los campos del
          formulario más tarde(este paso es necesario para generar un link de
          pago)
        </p>
      </Dialog>

      {pendingTransaction && (
        <TransactionsList form={formInfo} transactions={[pendingTransaction]} />
      )}
      {formInfo?.transactions.length !== 0 && (
        <TransactionsList
          form={formInfo}
          transactions={formInfo?.transactions}
        />
      )}
    </div>
  );
};

export default ConfirmSale;
