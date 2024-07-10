import { FileUpload } from "primereact/fileupload";
import { ENV } from "../../../consts/const";
import { useParams } from "react-router";
import { FileType } from "../../../models/file";

const UploadCards = () => {
  const { hash } = useParams();

  return (
    <div>
      <label>
        Sube una foto delantera de tu identificación (este campo es opcional)
      </label>
      <FileUpload
        onBeforeUpload={(e) => {
          e.formData.append("type", FileType.cardId);
          return e;
        }}
        name="file"
        url={`${ENV.BACKEND_ROUTE}/files/${hash}`}
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<p className="m-0">Arrastra un imagen aquí</p>}
      />
      <label>
        Sube una foto del reverso de tu identificación (este campo es opcional)
      </label>
      <FileUpload
        onBeforeUpload={(e) => {
          e.formData.append("type", FileType.cardId);
          return e;
        }}
        name="file"
        url={`${ENV.BACKEND_ROUTE}/files/${hash}`}
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<p className="m-0">Arrastra un imagen aquí</p>}
      />
    </div>
  );
};

export default UploadCards;
