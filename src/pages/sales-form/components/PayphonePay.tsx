import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useToggle from "../../../hooks/useToggle";
import { InputMask } from "primereact/inputmask";
import { FormEventHandler, useContext, useEffect, useState } from "react";
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

const PayphonePay = () => {
  const { form } = useContext(SalesFormContext);

  const { value, toggle } = useToggle(false);
  const [checkingStatus, setCheckStatus] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<
    TransactionGetDto | undefined
  >(undefined);
  const [startCheckingStatus, setStartCheckingStatus] = useState(false);

  const { remove } = useQuery({
    queryFn: () =>
      verifyStatusTransaction(currentTransaction?.transactionId as number).then(
        (res) => res.data
      ),
    refetchInterval: 5000,
    enabled: startCheckingStatus,
    onSuccess: (data) => {
      if (data.transaction.statusCode === TransactionStatus.accepted) {
        console.log("transaction was completed successfully");
        setStartCheckingStatus(false);
        setCheckStatus(false);
        remove();
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
      formId: form?.form?.id as number,
    });
  };

  return (
    <div>
      <Button label="Pagar con payphone" onClick={() => toggle()} />
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
              mask="9999999999"
              placeholder="0999999999"
              name="phoneNumber"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label htmlFor="">Código país número de teléfono: </label>
            <InputMask mask="+999" placeholder="+593" name="countryCode" />
          </div>
          <Button
            label="Pagar"
            disabled={checkingStatus}
            loading={checkingStatus}
          />
        </form>
      </Dialog>
    </div>
  );
};

export default PayphonePay;
