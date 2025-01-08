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
import GenerateSignatureLinkButton from "./GenerateSignatureLinkButton";

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
        if (hashMode && !response.data.transaction) {
          window.location.reload();
        }
        dialog.setFalse();
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
      <div style={{ display: "grid", gap: "10px" }}>
        {!hashMode && <GenerateSignatureLinkButton />}
        <Button
          disabled={formInfo?.block}
          label="Confirmar datos"
          onClick={() => dialog.setTrue()}
        />
        {pendingTransaction && formInfo?.transactions.length === 0 && (
          <TransactionsList
            form={formInfo}
            transactions={[pendingTransaction]}
          />
        )}
        {formInfo?.transactions.length !== 0 && (
          <TransactionsList
            form={formInfo}
            transactions={formInfo?.transactions}
          />
        )}
      </div>

      <Dialog
        closable={!isLoadingVerification.value}
        style={{ width: "90vw", maxWidth: "400px" }}
        visible={dialog.value}
        draggable={false}
        onHide={() => {
          dialog.setFalse();
        }}
        header="Confirmación de datos"
        footer={
          <div>
            <Button
              label="Cancelar"
              onClick={() => dialog.setFalse()}
              className="p-button-danger"
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
            />
          </div>
        }
      >
        <p>
          Si aceptas confirmar los datos no podrás modificar los campos del
          formulario más tarde(este paso es necesario para generar un link de
          pago si es necesario)
        </p>
      </Dialog>
    </div>
  );
};

export default ConfirmSale;
