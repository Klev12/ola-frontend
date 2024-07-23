import React, { useRef, useState } from "react";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { authenticate } from "../../services/auth-service";
import { Navigate, useNavigate } from "react-router";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import ROUTES from "../../consts/routes";

type Severity = "error" | "success" | "info" | "warn";

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const fileUploadRef1 = useRef<FileUpload>(null);
  const fileUploadRef2 = useRef<FileUpload>(null);

  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const { data: userData } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
  });

  const showToast = (severity: Severity, summary: string, detail: string) => {
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

  const onUploadSuccessImages = () => {
    setImagesUploaded(true);
    showToast("success", "Success", "Imágenes subidas correctamente.");
  };

  const onUploadSuccessVideo = () => {
    setVideoUploaded(true);
    showToast("success", "Success", "Video subido correctamente.");
  };

  const onUploadError = (event: any) => {
    const errorMessage = event.xhr?.responseText
      ? JSON.parse(event.xhr.responseText).error.message
      : "Error desconocido.";
    showToast("error", "Error", errorMessage);
  };

  if (userData?.user?.multimedias?.length === 3) {
    return <Navigate to={ROUTES.USER_FORM.SIGNATURE} />;
  }

  if (userData?.user?.multimedias?.length === 4) {
    return <Navigate to={ROUTES.USER_FORM.VERIFICATION} />;
  }

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
        onUpload={onUploadSuccessImages}
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
        onUpload={onUploadSuccessVideo}
        onError={onUploadError}
      />
      <Divider />
      <Button
        label="Siguiente"
        onClick={() => {
          navigate(ROUTES.USER_FORM.SIGNATURE);
        }}
        disabled={!imagesUploaded || !videoUploaded}
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
