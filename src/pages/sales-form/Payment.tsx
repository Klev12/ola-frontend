import { useContext } from "react";
import { SalesFormContext } from "./components/WrapperSalesForm";
import { ProgressSpinner } from "primereact/progressspinner";

const Payment = () => {
  const { isFormLoading } = useContext(SalesFormContext);
  const { form } = useContext(SalesFormContext);
  const { hash } = useParams();

  const { mutate: markFormToDoneMutate } = useMutation(markFormToDone, {
    onSuccess: () => {
      window.location.reload();
    },
  });

  if (isFormLoading) {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  }

  return <div>Payment</div>;
};

export default Payment;
