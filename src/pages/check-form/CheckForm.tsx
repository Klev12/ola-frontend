import { useMutation, useQuery } from "react-query";
import { getFormById } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";

const CheckForm = () => {
  const { id } = useParams();

  const { data: formData } = useQuery({
    queryFn: () => getFormById(id as string).then((res) => res.data),
    queryKey: ["form-user", id],
    retry: 1,
  });

  const { mutate: submitFormMutate, isLoading } = useMutation(submitForm);

  return (
    <div className="user-form">
      <PrintForm
        normalMode={true}
        form={formData}
        isLoading={isLoading}
        onSubmit={(data) => {
          console.log(data);
          submitFormMutate(data);
        }}
      />
    </div>
  );
};

export default CheckForm;
