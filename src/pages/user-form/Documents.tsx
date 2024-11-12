import React, { useRef, useState } from "react";
import { ENV } from "../../consts/const";
import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import ROUTES from "../../consts/routes";
import FileUploader from "../../components/FileUploader";
import { FileDocument } from "../../models/file";
import userService from "../../services/user-service";
import { authenticate } from "../../services/auth-service";

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [videoUploaded] = useState(false);

  const { data: userData } = useQuery({
    queryFn: () => authenticate().then((res) => res.data),
    queryKey: ["user-data"],
    refetchOnWindowFocus: false,
  });

  const { data: multimediaData, refetch: refetchUser } = useQuery({
    queryFn: () =>
      userService
        .getMultimedia({ userId: userData?.user.id as number })
        .then((res) => res.data),
    queryKey: ["multimedia"],
    refetchOnWindowFocus: false,
  });

  if (multimediaData?.multimedia?.length === 3) {
    return <Navigate to={ROUTES.USER_FORM.SIGNATURE} />;
  }

  if (multimediaData?.multimedia?.length === 4) {
    return <Navigate to={ROUTES.USER_FORM.VERIFICATION} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cédula</h2>
      <p>
        Debes subir dos fotos de tu cédula, la parte de enfrente y la parte de
        atrás de la cédula
      </p>
      <FileUploader
        type="image"
        name="userCard"
        uploadUrl={`${ENV.BACKEND_ROUTE}/multimedia/user-card`}
        maxFiles={2}
        showSpecificDelete={false}
        defaultFiles={
          multimediaData?.multimedia
            ?.filter((file) => file.type === "card_id")
            .map(
              (file) =>
                ({
                  id: file.id,
                  url: `${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`,
                  status: "completado",
                  identifier: file.hash,
                } as FileDocument)
            ) || []
        }
        deleteUrl={`${ENV.BACKEND_ROUTE}/multimedia/`}
        onAfterUpload={() => {
          refetchUser();
          setImagesUploaded(true);
        }}
        accept=".jpeg, .png"
      />

      <h2>Video</h2>
      <small>Debes decir lo siguiente en el video</small>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        dolor sequsantium incidunt quibusdam sed quod, non delectus hic unde!
      </p>
      <Divider />
      <FileUploader
        type="video"
        name="video"
        uploadUrl={`${ENV.BACKEND_ROUTE}/multimedia/video`}
        maxFiles={1}
        showSpecificDelete={false}
        defaultFiles={
          multimediaData?.multimedia
            ?.filter((file) => file.type === "video")
            .map(
              (file) =>
                ({
                  id: file.id,
                  url: `${ENV.BACKEND_ROUTE}/multimedia/${file.hash}`,
                  status: "completado",
                  identifier: file.hash,
                } as FileDocument)
            ) || []
        }
        deleteUrl={`${ENV.BACKEND_ROUTE}/multimedia/`}
        onAfterUpload={() => {
          refetchUser();
          setImagesUploaded(true);
        }}
        accept=".mp4"
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
