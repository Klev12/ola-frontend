import React, { useMemo, useRef, useState } from "react";
import { FileUpload, FileUploadErrorEvent } from "primereact/fileupload";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";
import { useMutation, useQuery } from "react-query";
import { authenticate } from "../../services/auth-service";
import { Navigate, useNavigate } from "react-router";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import ROUTES from "../../consts/routes";
import { MultimediaType } from "../../models/user";
import { PrimeIcons } from "primereact/api";
import multimediaService from "../../services/multimedia-service";

type Severity = "error" | "success" | "info" | "warn";

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const fileUploadRef1 = useRef<FileUpload>(null);
  const fileUploadRef2 = useRef<FileUpload>(null);

  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const { data: userData, refetch: refetchUser } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    queryKey: ["user-data"],
  });

  const { mutate: deleteMultimediaByHash } = useMutation(
    multimediaService.deleteByHash,
    {
      onSuccess: () => {
        refetchUser();
      },
    }
  );

  const showToast = (severity: Severity, summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
    refetchUser();
  };

  const onUploadSuccessImages = () => {
    setImagesUploaded(true);
    showToast("success", "Success", "Imágenes subidas correctamente.");
  };

  const onUploadSuccessVideo = () => {
    setVideoUploaded(true);
    showToast("success", "Success", "Video subido correctamente.");
  };

  const onUploadError = (event: FileUploadErrorEvent) => {
    const errorMessage = event.xhr?.responseText
      ? JSON.parse(event.xhr.responseText).error.message
      : "Error desconocido.";
    showToast("error", "Error", errorMessage);
  };

  const cardIdImages = useMemo(() => {
    return userData?.user.multimedias.filter(
      (multimedia) => multimedia.type === MultimediaType.cardId
    );
  }, [userData]);

  const video = useMemo(() => {
    return userData?.user.multimedias.find(
      (multimedia) => multimedia.type === MultimediaType.video
    );
  }, [userData]);

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
        onUpload={onUploadSuccessImages}
        onError={onUploadError}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 200px",
          gap: "10px",
        }}
      >
        {cardIdImages?.map((multimedia) => {
          return (
            <div>
              <Button
                rounded
                icon={PrimeIcons.TIMES}
                onClick={() => deleteMultimediaByHash(multimedia.hash)}
              />
              <img
                style={{ width: "100%" }}
                src={`${ENV.BACKEND_ROUTE}/multimedia/${multimedia.hash}`}
              ></img>
            </div>
          );
        })}
      </div>
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
        onUpload={onUploadSuccessVideo}
        onError={onUploadError}
      />
      <div>
        {video && (
          <div>
            <Button
              rounded
              icon={PrimeIcons.TIMES}
              onClick={() => deleteMultimediaByHash(video.hash)}
            />
            <video
              src={`${ENV.BACKEND_ROUTE}/multimedia/${video.hash}`}
            ></video>
          </div>
        )}
      </div>
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
