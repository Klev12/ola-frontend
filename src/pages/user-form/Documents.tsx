import { FileUpload } from "primereact/fileupload";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";
import useGlobalState from "../../store/store";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import { verifyUser } from "../../services/auth-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { Divider } from "primereact/divider";

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
      <p>
        Debes subir dos fotos de tu cédula, la parte de enfrente y la parte de
        atrás de la cédula
      </p>
      <FileUpload
        multiple={true}
        name="userCard"
        withCredentials={true}
        chooseOptions={{ style: { backgroundColor: "purple", border: "0" } }}
        uploadOptions={{ style: { backgroundColor: "purple", border: "0" } }}
        uploadLabel="Subir"
        chooseLabel="Elegir imágenes"
        cancelOptions={{ style: { display: "none" } }}
        cancelLabel="Cancelar"
        url={`${ENV.BACKEND_ROUTE}/multimedia/user-card`}
      />
      <h2>Video</h2>
      <small>Debes decir lo siguiente en el video</small>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        dolor sequsantium incidunt quibusdam sed quod, non delectus hic unde!
      </p>
      <Divider />
      <FileUpload
        chooseOptions={{ style: { backgroundColor: "purple", border: "0" } }}
        uploadOptions={{ style: { backgroundColor: "purple", border: "0" } }}
        uploadLabel="Subir"
        chooseLabel="Elegir video"
        cancelLabel={undefined}
        cancelOptions={{ label: "cancelLabel", style: { display: "none" } }}
        multiple={true}
        name="video"
        withCredentials={true}
        url={`${ENV.BACKEND_ROUTE}/multimedia/video`}
      />
      <Divider />
      <Button
        label="Enviar formulario"
        onClick={submit}
        style={{ backgroundColor: "purple", border: "0", margin: "10px" }}
      />
    </div>
  );
};

export default Documents;
