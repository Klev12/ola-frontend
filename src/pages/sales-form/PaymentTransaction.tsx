import { useQuery } from "react-query";
import useQueryPath from "../../hooks/useQueryPath";
import { confirmTransaction } from "../../services/transaction-service";
import useToggle from "../../hooks/useToggle";
import { TransactionStatus } from "../../models/transaction";
import { ProgressSpinner } from "primereact/progressspinner";
import TransactionCard from "./components/payment/TransactionCard";

const PaymentTransaction = () => {
  const query = useQueryPath();

  const checkStatus = useToggle(true);

  const { data: transactionData, isLoading } = useQuery({
    queryFn: () =>
      confirmTransaction({
        id: Number(query.get("id") as string),
        clientTxId: query.get("clientTransactionId")?.toString() as string,
      }).then((res) => res.data),
    refetchInterval: 5000,
    enabled: checkStatus.value,
    queryKey: ["transaction-data-end", query.get("clientTransactionId")],
    onSuccess: (response) => {
      if (
        response.transaction.statusCode === TransactionStatus.accepted ||
        response.transaction.statusCode === TransactionStatus.cancelled
      ) {
        checkStatus.setFalse();
      }
    },
  });

  if (!query.get("id")) {
    return <div>id es requerido</div>;
  }

  if (!query.get("clientTransactionId")) {
    return <div>clientTransactionId es requerido</div>;
  }

  if (isLoading) {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  }

  return <TransactionCard transaction={transactionData?.transaction} />;
};

export default PaymentTransaction;
