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

const ConfirmSale = () => {
  const { form, hashMode } = useContext(SalesFormContext);
  const toast = useRef<Toast>(null);
  const dialog = useToggle();
  const isLoadingVerification = useToggle();
  const isFormBlocked = useToggle(form?.form?.block);

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
      onError: (error) => {
        const message = (error as any)?.response?.data?.error?.message;
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
        disabled={form?.form?.block}
        label="Confirmar venta"
        onClick={() => dialog.setTrue()}
      />

      <Dialog header="Confirmar Venta" onHide={() => {}}></Dialog>
      <Dialog
        closable={!isLoadingVerification.value}
        style={{ width: "50vw" }}
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
                  formId: form?.form?.id as number,
                  hash: hashMode ? (form?.form?.hash as string) : undefined,
                });
              }}
              className="p-button-danger"
            />
          </div>
        }
      >
        <p>
          Si aceptas confirmar esta venta no podrás modificar los campos del
          formulario y los datos del pago más tarde (este paso es necesario para
          generar un link de pago)
        </p>
      </Dialog>

      {pendingTransaction && (
        <TransactionsList
          form={form?.form}
          transactions={[pendingTransaction]}
        />
      )}
      {form?.form?.transactions.length !== 0 && (
        <TransactionsList
          form={form?.form}
          transactions={form?.form?.transactions}
        />
      )}
    </div>
  );
};

export default ConfirmSale;
