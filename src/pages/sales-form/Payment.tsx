import { useContext } from "react";
import { SalesFormContext } from "./components/WrapperSalesForm";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { useMutation } from "react-query";
import { markFormToDone } from "../../services/forms-service";
import { useParams } from "react-router";

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

  return (
    <div>
      <Button
        label="Pagar"
        onClick={() => {
          markFormToDoneMutate({
            formId: form?.form?.id as number,
            hash: hash as string,
          });
        }}
      />
    </div>
  );
};

export default Payment;
