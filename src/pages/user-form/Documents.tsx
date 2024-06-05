import React, { useRef } from "react";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";
import useGlobalState from "../../store/store";
import { useMutation } from "react-query";
import { verifyForm } from "../../services/forms-service";
import { verifyUser } from "../../services/auth-service";
import { useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const userFormId = useGlobalState((state) => state.userFormId);
  const toast = useRef<Toast>(null);
  const fileUploadRef1 = useRef<FileUpload>(null);
  const fileUploadRef2 = useRef<FileUpload>(null);

  const { mutate: verifyUserMutate } = useMutation(verifyUser, {
    onSuccess: () => navigate(ROUTES.HOME.ME),
  });

  const { mutate: verifyFormMutate } = useMutation(verifyForm, {
    onSuccess: () => {
      verifyUserMutate();
      showToast(
        "success",
        "Success",
        "Se ha enviado correctamente las credenciales"
      );
    },
  });

  const submit = () => {
    const images = fileUploadRef1.current?.getFiles();
    const video = fileUploadRef2.current?.getFiles();

    if (!images || images.length < 2) {
      showToast("error", "Error", "Debe subir dos imágenes.");
      return;
    }

    if (!video || video.length !== 1) {
      showToast("error", "Error", "Debe subir un video.");
      return;
    }

    const videoFile = video[0];
    if (videoFile.size > 50 * 1024 * 1024) {
      showToast("error", "Error", "El video no debe exceder los 50MB.");
      return;
    }

    verifyFormMutate(userFormId as number);
  };

  const showToast = (severity: string, summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const beforeUploadImages = (event: FileUploadHandlerEvent) => {
    if (event.files.length < 2) {
      showToast("error", "Error", "Debe subir dos imágenes.");
      event.options.clear();
      return false;
    }
    return true;
  };

  const beforeUploadVideo = (event: FileUploadHandlerEvent) => {
    const file = event.files[0];
    if (file.size > 50 * 1024 * 1024) {
      showToast("error", "Error", "El video no debe exceder los 50MB.");
      event.options.clear();
      return false;
    }
    return true;
  };

  const onUploadError = (event: any) => {
    const errorMessage = event.xhr?.responseText
      ? JSON.parse(event.xhr.responseText).error.message
      : "Error desconocido.";
    showToast("error", "Error", errorMessage);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cédula</h2>
      <p>
        Debes subir dos fotos de tu cédula, la parte de enfrente y la parte de
        atrás de la cédula
      </p>
      <FileUpload
        ref={fileUploadRef1}
        multiple={true}
        name="userCard"
        withCredentials={true}
        chooseOptions={{
          style: { backgroundColor: "purple", border: "0", boxShadow: "none" },
        }}
        uploadOptions={{
          style: { backgroundColor: "purple", border: "0", boxShadow: "none" },
        }}
        uploadLabel="Subir"
        chooseLabel="Elegir imágenes"
        cancelOptions={{ style: { display: "none" } }}
        cancelLabel="Cancelar"
        url={`${ENV.BACKEND_ROUTE}/multimedia/user-card`}
        beforeUpload={beforeUploadImages}
        onUpload={() =>
          showToast("success", "Success", "Imágenes subidas correctamente.")
        }
        onError={onUploadError}
      />
      <h2>Video</h2>
      <small>Debes decir lo siguiente en el video</small>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        dolor sequsantium incidunt quibusdam sed quod, non delectus hic unde!
      </p>
      <Divider />
      <FileUpload
        ref={fileUploadRef2}
        chooseOptions={{
          style: { backgroundColor: "purple", border: "0", boxShadow: "none" },
        }}
        uploadOptions={{
          style: { backgroundColor: "purple", border: "0", boxShadow: "none" },
        }}
        uploadLabel="Subir"
        chooseLabel="Elegir video"
        cancelLabel={undefined}
        cancelOptions={{ style: { display: "none" } }}
        multiple={false}
        name="video"
        withCredentials={true}
        url={`${ENV.BACKEND_ROUTE}/multimedia/video`}
        beforeUpload={beforeUploadVideo}
        onUpload={() =>
          showToast("success", "Success", "Video subido correctamente.")
        }
        onError={onUploadError}
      />
      <Divider />
      <Button
        label="Enviar formulario"
        onClick={submit}
        style={{
          backgroundColor: "purple",
          border: "0",
          margin: "10px",
          boxShadow: "none",
        }}
      />
      <Toast ref={toast} />
    </div>
  );
};

export default Documents;
