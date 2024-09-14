import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { InputMask } from "primereact/inputmask";
import {
  FormEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SalesFormContext } from "./WrapperSalesForm";
import { useMutation, useQuery } from "react-query";
import {
  createTransactionPayphone,
  verifyStatusTransaction,
} from "../../../services/transaction-service";
import {
  TransactionGetDto,
  TransactionStatus,
} from "../../../models/transaction";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import ROUTES from "../../../consts/routes";

interface PayphonePayProps {
  children?: ReactNode;
  disableButton?: boolean;
}

const PayphonePay = ({ children, disableButton }: PayphonePayProps) => {
  const toast = useRef<Toast>(null);

  const { formInfo } = useContext(SalesFormContext);

  const { value, toggle, setFalse } = useToggle(false);
  const [checkingStatus, setCheckStatus] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<
    TransactionGetDto | undefined
  >(undefined);
  const [startCheckingStatus, setStartCheckingStatus] = useState(false);
  const [acceptedTransaction, setAcceptedTransaction] = useState<
    TransactionGetDto | undefined
  >(undefined);
  const transactionDialog = useToggle();

  useEffect(() => {
    if (acceptedTransaction) {
      transactionDialog.setTrue();
    }
  }, [acceptedTransaction]);

  const {} = useQuery({
    queryFn: () =>
      verifyStatusTransaction(currentTransaction?.transactionId as number).then(
        (res) => res.data
      ),
    refetchInterval: 5000,
    enabled: startCheckingStatus,
    onSuccess: (data) => {
      if (data.transaction.statusCode === TransactionStatus.accepted) {
        setStartCheckingStatus(false);
        setCheckStatus(false);
        toast.current?.show({
          severity: "success",
          summary: "Transacción realizada",
          detail: "La transacción se hizo con exito",
        });
        setFalse();
        setAcceptedTransaction(data.transaction);
      }

      if (data.transaction.statusCode === TransactionStatus.cancelled) {
        setStartCheckingStatus(false);
        setCheckStatus(false);
      }
    },
  });

  const {
    mutate: createTransactionPayphoneMutate,
    isLoading: isLoadingTransaction,
  } = useMutation(createTransactionPayphone, {
    onSuccess: (response) => {
      const { transaction } = response.data;
      setCurrentTransaction(transaction);
      setStartCheckingStatus(true);
    },
    onError: (data) => {
      const message = (data as any)?.response?.data?.message;
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
      setStartCheckingStatus(false);
      setCheckStatus(false);
    },
  });

  useEffect(() => {
    if (isLoadingTransaction) setCheckStatus(true);
  }, [isLoadingTransaction]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    const countryCode = formData["countryCode"].toString().replace("+", "");

    createTransactionPayphoneMutate({
      countryCode: Number(countryCode),
      phoneNumber: formData["phoneNumber"].toString(),
      formId: formInfo?.id as number,
    });
  };

  const navigate = useNavigate();

  return (
    <div>
      <Toast ref={toast} />
      <Button
        disabled={disableButton}
        label="Pagar con payphone"
        onClick={() => toggle()}
      />
      {children}
      <Dialog
        header="Transacción"
        draggable={false}
        visible={transactionDialog.value}
        onHide={() => {
          transactionDialog.toggle();
          navigate(ROUTES.SALES.DONE_FORMS);
        }}
      >
        <p>Monto: {(acceptedTransaction?.amount as number) / 100}$</p>
        <p>Nombre de tienda: {acceptedTransaction?.storeName}</p>
        <p>
          Id de transacción del cliente:{" "}
          {acceptedTransaction?.clientTransactionId}
        </p>
        <p>Id de transacción: {acceptedTransaction?.transactionId}</p>
        <p>Estatus: aceptado</p>
      </Dialog>
      <Dialog
        header="Pago con payphone"
        closable={!checkingStatus}
        draggable={false}
        visible={value}
        style={{ width: "50vw" }}
        onHide={() => {
          toggle();
        }}
      >
        <form
          action=""
          style={{ display: "grid", gap: 20 }}
          onSubmit={onSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Número de télefono: </label>
            <InputMask
              required
              mask="9999999999"
              placeholder="0999999999"
              name="phoneNumber"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Código país número de teléfono: </label>
            <InputMask
              required
              mask="+999"
              placeholder="+593"
              name="countryCode"
            />
          </div>
          <Button
            label="Pagar"
            disabled={checkingStatus}
            loading={checkingStatus}
          />
          {checkingStatus && (
            <>
              <label htmlFor="">Verificando pago</label>
              <ProgressBar
                mode="indeterminate"
                style={{ height: "6px" }}
              ></ProgressBar>
            </>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default PayphonePay;
