import { useMutation, useQuery } from "react-query";
import { getUserFormByUserId } from "../../services/forms-service";
import PrintForm from "../../components/PrintForm";
import { useParams } from "react-router";
import { submitForm } from "../../services/result-service";
import { findUserById } from "../../services/user-service";
import { ENV } from "../../consts/const";
import { MultimediaType } from "../../models/user";

const CheckUserForm = () => {
  const { id } = useParams();

  const { mutate: findUserByIdMutate, data: userData } =
    useMutation(findUserById);

  const { data: formData } = useQuery({
    queryFn: () => getUserFormByUserId(id as string).then((res) => res.data),
    queryKey: ["form-user", id],
    retry: 1,
    onSuccess: (data) => {
      findUserByIdMutate(data.user_form.user_id);
    },
  });

  const { mutate: submitFormMutate, isLoading } = useMutation(submitForm);

  return (
    <div>
      {userData?.data.user.multimedias.map((file) => {
        if (file.type === MultimediaType.video) {
          return (
            <video
              src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
              width={300}
              height={200}
              controls={true}
            ></video>
          );
        }

        return (
          <img
            src={`${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`}
            alt={file.name}
            width={200}
            height={200}
          />
        );
      })}
      <PrintForm
        form={formData}
        isLoading={isLoading}
        onSubmit={(data) => {
          submitFormMutate(data);
        }}
      />
    </div>
  );
};

export default CheckUserForm;
