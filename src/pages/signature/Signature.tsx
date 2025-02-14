import React from "react";

import FileUploader from "../../components/FileUploader";
import { ENV } from "../../consts/const";
import { useQuery } from "react-query";
import { authenticate } from "../../services/auth-service";
import { FileDocument } from "../../models/file";
import { Navigate } from "react-router";
import ROUTES from "../../consts/routes";
import userService from "../../services/user-service";

const SignatureDraw: React.FC = () => {
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
    queryKey: ["signature-data"],
    refetchOnWindowFocus: false,
  });

  if (multimediaData?.multimedia?.length === 4) {
    return <Navigate to={ROUTES.USER_FORM.VERIFICATION} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h2>Firma</h2>
      <p>Por favor realizar su firma en el cuadrado de color blanco.</p>
      <FileUploader
        type="canvas-draw"
        name="signature"
        uploadUrl={`${ENV.BACKEND_ROUTE}/multimedia/signature`}
        deleteUrl={`${ENV.BACKEND_ROUTE}/multimedia/`}
        defaultFiles={
          multimediaData?.multimedia
            ?.filter((file) => file.type === "signature")
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
        maxFiles={1}
        showSpecificDelete={false}
        onAfterUpload={() => {
          refetchUser();
        }}
      />
    </div>
  );
};

export default SignatureDraw;
