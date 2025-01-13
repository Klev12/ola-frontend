import axios from "../../interceptors/axios-interceptor";
import { ENV } from "../../consts/const";
import { ProofGetDto } from "../../models/proof";
import { Roles } from "../../models/user";
import useGlobalState from "../../store/store";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import multimediaService from "../../services/multimedia-service";

interface ProofElementMenuProps {
  proof: ProofGetDto;
  onSuccessUpload?: () => void;
}

const ProofElementMenu = ({
  proof,
  onSuccessUpload,
}: ProofElementMenuProps) => {
  const toast = useRef<Toast>(null);
  const fileUploader = useRef<FileUpload>(null);
  const authenticatedUser = useGlobalState((state) => state.user);
  const onUpload = async (event: FileUploadHandlerEvent) => {
    const formData = new FormData();

    formData.append("proof", event.files[0]);

    formData.append("proofId", String(proof.id));

    await axios.patch(`${ENV.BACKEND_ROUTE}/proofs/image`, formData);
    toast.current?.show({
      severity: "success",
      summary: "La imagen ha sido remplazada exitosamente",
    });
    fileUploader.current?.clear();
    if (onSuccessUpload) onSuccessUpload();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Toast ref={toast} />
      <Image
        src={`${multimediaService.api.proof}/${proof.hash}`}
        width="100%"
        preview
      />
      {authenticatedUser?.role === Roles.admin && (
        <FileUpload
          ref={fileUploader}
          name="proof"
          mode="basic"
          chooseLabel="Editar"
          customUpload={true}
          uploadHandler={onUpload}
        />
      )}
    </div>
  );
};

export default ProofElementMenu;
