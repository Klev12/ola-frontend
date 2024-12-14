import { useQuery } from "react-query";
import TransactionCard from "../sales-form/components/payment/TransactionCard";
import transactionService from "../../services/transaction-service";
import { useParams } from "react-router";

const GlobalInvoice = () => {
  const { token } = useParams();

  const { data: transactionStatusData } = useQuery({
    queryFn: () =>
      transactionService
        .getStatusByToken({ token: String(token) })
        .then((res) => res.data),
    retry: 1,
    queryKey: ["transaction-status-data", token],
  });

  return <TransactionCard transaction={transactionStatusData?.transaction} />;
};

export default GlobalInvoice;
