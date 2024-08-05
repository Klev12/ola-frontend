import { FileUpload } from "primereact/fileupload";
import { ENV } from "../../../consts/const";
import { useParams } from "react-router";
import { FileType } from "../../../models/file";
import { useContext } from "react";
import { SalesFormContext } from "./WrapperSalesForm";

const UploadCards = () => {
  const { form } = useContext(SalesFormContext);
  const { hash } = useParams();

  return (
    <div>
      <label>
        Sube una foto delantera de tu identificación (este campo es opcional)
      </label>
      <FileUpload
        withCredentials
        onBeforeUpload={(e) => {
          if (!hash) {
            e.formData.append("formId", form?.form?.id as string);
          }
          e.formData.append("type", FileType.cardId);
          return e;
        }}
        name="file"
        url={`${ENV.BACKEND_ROUTE}/files/${hash ? hash : ""}`}
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<p className="m-0">Arrastra un imagen aquí</p>}
      />
      <label>
        Sube una foto del reverso de tu identificación (este campo es opcional)
      </label>
      <FileUpload
        withCredentials
        onBeforeUpload={(e) => {
          if (!hash) {
            e.formData.append("formId", form?.form?.id as string);
          }
          e.formData.append("type", FileType.cardId);
          return e;
        }}
        name="file"
        url={`${ENV.BACKEND_ROUTE}/files/${hash ? hash : ""}`}
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<p className="m-0">Arrastra una imagen aquí</p>}
      />
    </div>
  );
};

export default UploadCards;
