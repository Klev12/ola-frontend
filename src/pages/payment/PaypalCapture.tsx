import { useQuery } from "react-query";
import useQueryPath from "../../hooks/useQueryPath";
import paypalService from "../../services/paypal-service";
import TransactionCard from "../sales-form/components/payment/TransactionCard";

const PaypalCapture = () => {
  const query = useQueryPath();

  const { data: transactionData } = useQuery({
    queryFn: () =>
      paypalService
        .captureOrder({ token: query.get("token") ?? "" })
        .then((res) => res.data),
  });

  return (
    <div>
      <TransactionCard transaction={transactionData?.transaction} />
    </div>
  );
};

export default PaypalCapture;
