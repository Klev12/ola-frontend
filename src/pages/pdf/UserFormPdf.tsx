import { useQuery } from "react-query";
import FormPdf from "./components/FormPdf";
import { getUserFormByUserId } from "../../services/forms-service";
import { useParams } from "react-router";
import { findUserById } from "../../services/user-service";

const UserFormPdf = () => {
  const { id } = useParams();

  const { data: userData } = useQuery({
    queryFn: () => findUserById(Number(id)).then((res) => res.data),
    queryKey: ["user-by-id", id],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: userFormData, isLoading } = useQuery({
    queryFn: () => getUserFormByUserId(Number(id)).then((res) => res.data),
    queryKey: ["user-form-by-user-id", id],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {userFormData && (
        <FormPdf
          type="user-form"
          formInfo={userFormData?.user_form}
          formScheme={userFormData?.form_scheme}
          user={userData?.user}
        />
      )}
      {!userFormData && !isLoading && <div>formulario no encontrado</div>}
    </>
  );
};

export default UserFormPdf;
