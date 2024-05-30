import { FileUpload } from "primereact/fileupload";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";
import useGlobalState from "../../store/store";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import { verifyUser } from "../../services/auth-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";

const Documents = () => {
  const navigate = useNavigate();
  const userFormId = useGlobalState((state) => state.userFormId);
  const { mutate: verifyUserMutate } = useMutation(verifyUser, {
    onSuccess: () => {
      navigate(ROUTES.HOME.ME);
    },
  });
  const { mutate: verifyFormMutate } = useMutation(verifyForm, {
    onSuccess: () => {
      verifyUserMutate();
    },
  });

  const submit = () => {
    verifyFormMutate(userFormId as number);
  };

  return (
    <div>
      <h2>Cédula</h2>
      <FileUpload
        multiple={true}
        name="userCard"
        withCredentials={true}
        uploadLabel="Subir"
        chooseLabel="Elegir imágenes"
        cancelLabel="Cancelar"
        url={`${ENV.BACKEND_ROUTE}/multimedia/user-card`}
      />
      <h2>Video</h2>
      <small>Debes decir lo siguiente en el video</small>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        dolor sequsantium incidunt quibusdam sed quod, non delectus hic unde!
      </p>
      <FileUpload
        uploadLabel="Subir"
        chooseLabel="Elegir video"
        cancelLabel="Cancelar"
        multiple={true}
        name="video"
        withCredentials={true}
        url={`${ENV.BACKEND_ROUTE}/multimedia/video`}
      />
      <Button label="Enviar formulario" onClick={submit} />
    </div>
  );
};

export default Documents;
